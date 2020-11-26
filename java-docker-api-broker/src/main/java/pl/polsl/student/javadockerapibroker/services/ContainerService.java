package pl.polsl.student.javadockerapibroker.services;

import com.github.dockerjava.api.command.*;
import com.github.dockerjava.api.model.Container;
import pl.polsl.student.javadockerapibroker.dto.ContainerCreateDto;

import java.util.List;

public interface ContainerService {

    Container findOneContainer(String id);
    List<Container> findAllContainers(Boolean showSize, Boolean showAll);//, List<String> statusFilters);
    CreateContainerResponse createContainer(ContainerCreateDto containerCreateDto);
    void startContainer(String id);
    void stopContainer(String id);
    void killContainer(String id);
    InspectContainerResponse inspectContainer(String id);
    //
    List<String> logContainer(String id) throws InterruptedException;
}
