package pl.polsl.student.javadockerapibroker.controllers;

import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.model.Container;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.javadockerapibroker.dto.docker.ContainerCreateDto;
import pl.polsl.student.javadockerapibroker.services.impl.ContainerServiceImpl;

import java.util.List;

@Api(value = "docker containers management")
@RequiredArgsConstructor
@RequestMapping("/containers")
@RestController
public class ContainerController {

    private final ContainerServiceImpl containerService;

    @ApiOperation(value = "Find one container.")
    @GetMapping("/{id}")
    public ResponseEntity<Container> findOne(@PathVariable String id) {
        Container container = containerService.findOneContainer(id);
        HttpStatus status = container == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(container);
    }

    @ApiOperation(value = "Find all images.", response = List.class)
    @GetMapping
    public List<Container> findAll(@RequestParam(name = "showSize", required = false, defaultValue = "false") Boolean showSize,
                                   @RequestParam(name = "showAll", required = false, defaultValue = "false") Boolean showAll
                                   //,@RequestParam(name = "statusFilters", required = false, defaultValue = "null") List<String> statusFilters
    ) {
        return containerService.findAllContainers(showSize, showAll);//, statusFilters);
    }

    @ApiOperation(value = "Inspect a container.")
    @GetMapping(value = "/{id}/inspect")
    public ResponseEntity<InspectContainerResponse> inspect(@PathVariable String id) {
        var response = containerService.inspectContainer(id);
        var status = response == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(response);
    }

    @ApiOperation(value = "Create a container.")
    @PostMapping
    public ResponseEntity<CreateContainerResponse> create(@RequestBody ContainerCreateDto containerCreateDto) {
        var res = containerService.createContainer(containerCreateDto);
        var status = res == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.CREATED;
        return ResponseEntity
                .status(status)
                .body(res);
    }

    @ApiOperation(value = "Start a container.")
    @PutMapping(value = "/{id}/start")
    public ResponseEntity<?> start(@PathVariable String id) {
        containerService.startContainer(id);
        return null;
    }

    @ApiOperation(value = "Stop a container.")
    @PutMapping(value = "/{id}/stop")
    public ResponseEntity<?> stop(@PathVariable String id) {
        containerService.stopContainer(id);
        return null;
    }

    @ApiOperation(value = "Kill a container.")
    @PutMapping(value = "/{id}/kill")
    public ResponseEntity<?> kill(@PathVariable String id) {
        containerService.killContainer(id);
        return null;
    }

    // Snapshot a container
}
