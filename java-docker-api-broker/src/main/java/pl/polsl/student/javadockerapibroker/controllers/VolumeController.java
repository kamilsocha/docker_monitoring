package pl.polsl.student.javadockerapibroker.controllers;

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

}
