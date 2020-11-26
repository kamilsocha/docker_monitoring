package pl.polsl.student.javadockerapibroker.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.*;
import com.github.dockerjava.api.model.Bind;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.HostConfig;
import com.github.dockerjava.api.model.PortBinding;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.polsl.student.javadockerapibroker.dto.docker.ContainerCreateDto;
import pl.polsl.student.javadockerapibroker.services.ContainerService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class ContainerServiceImpl implements ContainerService {

    private final DockerClient dockerClient;

    @Override
    public Container findOneContainer(String id) {
        return null;
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

        var res = dockerClient.createContainerCmd(dto.getImage())
                .withCmd(dto.getCmd()) // String...
                .withName(dto.getName())
                .withHostName(dto.getHostName())
                .withEnv(dto.getEnv()) // String...
                .withHostConfig(hostConfig)
                .exec();
        return res;
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
    public InspectContainerResponse inspectContainer(String id) {
        return dockerClient.inspectContainerCmd(id).exec();
    }
}
