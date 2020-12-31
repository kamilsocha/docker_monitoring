package pl.polsl.student.javadockerapibroker.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.command.LogContainerCmd;
import com.github.dockerjava.api.model.*;
import org.springframework.stereotype.Service;
import pl.polsl.student.javadockerapibroker.components.DateFormatter;
import pl.polsl.student.javadockerapibroker.dto.ContainerCreateDto;
import pl.polsl.student.javadockerapibroker.exceptions.ContainerCreationException;
import pl.polsl.student.javadockerapibroker.services.ContainerService;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class ContainerServiceImpl implements ContainerService {

    private final DockerClient dockerClient;
    private int lastLogTime;
    private final DateFormatter dateFormatter;


    public ContainerServiceImpl(DockerClient dockerClient, DateFormatter dateFormatter) {
        this.dockerClient = dockerClient;
        this.lastLogTime = (int)(System.currentTimeMillis() / 1000);
        this.dateFormatter = dateFormatter;
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
    public List<Container> findAllContainers(Boolean showSize, Boolean showAll) {
        return dockerClient.listContainersCmd()
                .withShowSize(showSize)
                .withShowAll(showAll)
                .exec();
    }

    @Override
    public CreateContainerResponse createContainer(ContainerCreateDto dto) {

        var createContainerCmd = dockerClient.createContainerCmd(dto.getImage());

        if(!dto.getName().equals("")) {
            createContainerCmd.withName(dto.getName());
        }
        if(!dto.getHostName().equals("")) {
            createContainerCmd.withName(dto.getHostName());
        }
        if(dto.getEnv().size() != 0) {
            createContainerCmd.withEnv(dto.getEnv().toArray(String[]::new));
        }
        if(dto.getBinds().size() != 0 || dto.getPortBindings().size() != 0) {
            HostConfig hostConfig = new HostConfig();
            hostConfig.setBinds(dto.getBinds().stream()
                    .map(Bind::parse).toArray(Bind[]::new));
            List<PortBinding> portBindingList = dto.getPortBindings().stream()
                    .map(PortBinding::parse)
                    .collect(Collectors.toCollection(ArrayList::new));
            hostConfig.withPortBindings(portBindingList);
            createContainerCmd.withHostConfig(hostConfig);
        }

        if(dto.getLabels().size() != 0) {
            createContainerCmd.withLabels(dto.getLabels());
        }

        var response = createContainerCmd.exec();

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
    public void restartContainer(String id) {
        dockerClient.restartContainerCmd(id).exec();
    }

    @Override
    public void removeContainer(String id) {

        dockerClient.removeContainerCmd(id)
//                .withForce(true)
                .exec();
    }

    @Override
    public InspectContainerResponse inspectContainer(String id) {
        return dockerClient.inspectContainerCmd(id).exec();
    }

    public List<String> logContainer(String id, String since) throws InterruptedException {

        final List<String> logs = new ArrayList<>();
        LogContainerCmd logContainerCmd = dockerClient.logContainerCmd(id)
                .withStdOut(true)
                .withStdErr(true)
                .withTimestamps(true);

        if(since != null) {
            LocalDateTime sinceDate = dateFormatter.parseDayTime(since);
            Long sinceLong = sinceDate.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
            int sinceInt = sinceLong.intValue() / 1000;
            logContainerCmd.withSince(sinceInt);
        }

        logContainerCmd.exec(new ResultCallback.Adapter<>() {
            @Override
            public void onNext(Frame object) {
                logs.add(object.toString());
            }
        }).awaitCompletion();
//        lastLogTime = (int) (System.currentTimeMillis() / 1000) + 5; // at least 5 seconds gap between logs
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
