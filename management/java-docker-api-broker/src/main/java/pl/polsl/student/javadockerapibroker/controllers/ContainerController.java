package pl.polsl.student.javadockerapibroker.controllers;

import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.model.Container;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.javadockerapibroker.dto.ContainerCreateDto;
import pl.polsl.student.javadockerapibroker.services.impl.ContainerServiceImpl;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

//@CrossOrigin("*")
@Api(value = "docker containers management")
@RequiredArgsConstructor
@RequestMapping("/containers")
@RestController
public class ContainerController {

    private final ContainerServiceImpl containerService;

    @ApiOperation(value = "Find container by id.")
    @GetMapping("/{id}")
    public ResponseEntity<Container> findById(@PathVariable String id) {
        Container container = containerService.findOneContainer(id);
        HttpStatus status = container == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(container);
    }

    @ApiOperation(value = "Find all controllers.", response = List.class)
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
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "Stop a container.")
    @PutMapping(value = "/{id}/stop")
    public ResponseEntity<?> stop(@PathVariable String id) {
        containerService.stopContainer(id);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "Kill a container.")
    @PutMapping(value = "/{id}/kill")
    public ResponseEntity<?> kill(@PathVariable String id) {
        containerService.killContainer(id);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "Restart a container.")
    @PutMapping(value = "/{id}/restart")
    public ResponseEntity<?> restart(@PathVariable String id) {
        containerService.restartContainer(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/logs")
    public ResponseEntity<List<String>> log(@PathVariable String id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(containerService.logContainer(id));
        } catch (InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable String id) {
        containerService.removeContainer(id);
        return ResponseEntity.ok().build();
    }

//    private ExecutorService nonBlockingService = Executors.newCachedThreadPool();
//
//    @GetMapping("/sse")
//    public SseEmitter handleSse() {
//        SseEmitter emitter = new SseEmitter();
//        nonBlockingService.execute(() -> {
//            try {
//                emitter.send("/sse" + " @ " + new Date());
//                emitter.complete();
//            } catch (Exception e) {
//                emitter.completeWithError(e);
//            }
//        });
//        return emitter;
//    }

//    @GetMapping("/srb")
//    public ResponseEntity<StreamingResponseBody> handleRbe() {
//        StreamingResponseBody stream = out -> {
//            String msg = "/srb" + " @ " + new Date();
//            out.write(msg.getBytes());
//        };
//        return new ResponseEntity<>(stream, HttpStatus.OK);
//    }

    @GetMapping(path = "/{id}/logs/continuous", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<String>> streamFlux(@PathVariable String id, @RequestParam(required = false, defaultValue = "5") Integer timeout) {
//        return Flux.interval(Duration.ofSeconds(1))
//                .map(sequence -> "Flux -  " + LocalTime.now().toString());
        return Flux.interval(Duration.ofSeconds(timeout))
                .map(sequence -> containerService.logContainerContinuously(id, timeout));
    }

    // Snapshot a container
}
