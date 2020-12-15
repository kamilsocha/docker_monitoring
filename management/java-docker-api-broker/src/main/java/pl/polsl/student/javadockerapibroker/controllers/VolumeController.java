package pl.polsl.student.javadockerapibroker.controllers;

import com.github.dockerjava.api.command.CreateVolumeResponse;
import com.github.dockerjava.api.command.InspectVolumeResponse;
import com.github.dockerjava.api.model.Volume;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.javadockerapibroker.services.impl.VolumeServiceImpl;

import java.util.List;

@Api(value = "docker volumes management")
@RequiredArgsConstructor
@RequestMapping("/volumes")
@RestController
public class VolumeController {

    private final VolumeServiceImpl volumeService;

    @ApiOperation(value = "Find one image.")
    @GetMapping("/{id}")
    public ResponseEntity<Volume> findOne(@PathVariable String id) {
        Volume volume = volumeService.findOneVolume();
        HttpStatus status = volume == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(volume);
    }

    @ApiOperation(value = "Find all images.", response = List.class)
    @GetMapping
    public List<InspectVolumeResponse> findAll(@RequestParam(name = "dangling", required = false, defaultValue = "false") Boolean dangling) {
        return volumeService.findAllVolumes(dangling);
    }

    @ApiOperation(value = "Inspect a volume.")
    @GetMapping(value = "/{name}/inspect")
    public ResponseEntity<InspectVolumeResponse> inspect(@PathVariable String name) {
        var res = volumeService.inspectVolume(name);
        var status = res == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(res);
    }

    @ApiOperation(value = "Create a volume.", notes = "Allows to specify a name, otherwise Docker gives volume the name.")
    @PostMapping
    public ResponseEntity<CreateVolumeResponse> create(@RequestParam String name) {
        var res = volumeService.createVolume(name);
        var status = res == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.CREATED;
        return ResponseEntity
                .status(status)
                .body(res);
    }

    @ApiOperation(value = "Remove a volume.", notes = "You can't remove a volume if it is in use from a container.")
    @DeleteMapping("/{name}")
    public ResponseEntity<?> remove(@PathVariable String name) {
        volumeService.removeVolume(name);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
