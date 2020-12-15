package pl.polsl.student.javadockerapibroker.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.command.LogContainerCmd;
import com.github.dockerjava.api.model.*;
import org.springframework.stereotype.Service;
import pl.polsl.student.javadockerapibroker.dto.ContainerCreateDto;
import pl.polsl.student.javadockerapibroker.exceptions.ContainerCreationException;
import pl.polsl.student.javadockerapibroker.services.ContainerService;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class ContainerServiceImpl implements ContainerService {

    private final DockerClient dockerClient;
    private int lastLogTime;


    public ContainerServiceImpl(DockerClient dockerClient) {
        this.dockerClient = dockerClient;
        this.lastLogTime = (int)(System.currentTimeMillis() / 1000);
    }

    @Override
    public Container findOneContainer(String id) {

        return dockerClient.listContainersCmd()
                .withShowAll(true)
                .exec()
                .stream()
                .filter(c -> c.getId().equals(id))
                .findAny()
                .orElse(null);
    }

    @Override
    public List<Container> findAllContainers(Boolean showSize, Boolean showAll) {//, List<String> statusFilters) {
        return dockerClient.listContainersCmd()
                .withShowSize(showSize)
                .withShowAll(showAll)
//                .withStatusFilter(statusFilters != null ? statusFilters : new ArrayList<>() {})
                .exec();
    }

    @Override
    public CreateContainerResponse createContainer(ContainerCreateDto dto) {
        HostConfig hostConfig = new HostConfig();
//        hostConfig.setBinds(Bind.parse(String.valueOf(binds)));
        hostConfig.setBinds(dto.getBinds().stream()
                .map(Bind::parse).toArray(Bind[]::new));
//        hostConfig.withPortBindings(PortBinding.parse(String.valueOf(portBindings)));
        List<PortBinding> portBindingList = dto.getPortBindings().stream()
                .map(PortBinding::parse)
                .collect(Collectors.toCollection(ArrayList::new));
        hostConfig.withPortBindings(portBindingList);
        var response = dockerClient.createContainerCmd(dto.getImage())
                .withCmd(dto.getCmd()) // String...
                .withName(dto.getName())
                .withHostName(dto.getHostName())
                .withEnv(dto.getEnv()) // String...
                .withHostConfig(hostConfig)
                .exec();
        if(response == null) {
            throw new ContainerCreationException("Container creation failed! Probably container with specified name already exists.");
        }
        return response;
    }

    @Override
    public void startContainer(String id) {
        dockerClient.startContainerCmd(id).exec();
    }

    @Override
    public void stopContainer(String id) {
        dockerClient.stopContainerCmd(id).exec();
    }

    @Override
    public void killContainer(String id) {
        dockerClient.killContainerCmd(id).exec();
    }

    @Override
    public void removeContainer(String id) {
        dockerClient.removeContainerCmd(id).exec();
    }

    @Override
    public InspectContainerResponse inspectContainer(String id) {
        return dockerClient.inspectContainerCmd(id).exec();
    }

    public List<String> logContainer(String id) throws InterruptedException {
        final List<String> logs = new ArrayList<>();
        LogContainerCmd logContainerCmd = dockerClient.logContainerCmd(id)
                .withStdOut(true)
                .withStdErr(true)
                .withSince(lastLogTime)
                .withTimestamps(true);

        logContainerCmd.exec(new ResultCallback.Adapter<>() {
            @Override
            public void onNext(Frame object) {
                logs.add(object.toString());
            }
        }).awaitCompletion();
        lastLogTime = (int) (System.currentTimeMillis() / 1000) + 5; // at least 5 seconds gap between logs
        return logs;
    }

//    public Flux<String> logs(String id) {
    public List<String> logContainerContinuously(String id, Integer timeout)  {
        List<String> res = new ArrayList<>();
        try {
            dockerClient.logContainerCmd(id)
                    .withStdOut(true)
                    .withStdErr(true)
                    .withSince(lastLogTime)
                    .withTimestamps(true)
                    .exec(new ResultCallback.Adapter<>(){
                        @Override
                        public void onNext(Frame object) {
                            res.add(object.toString());
                        }
                    }).awaitCompletion(timeout, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        lastLogTime = (int) (System.currentTimeMillis() / 1000) + timeout;
        return res;
    }
}
