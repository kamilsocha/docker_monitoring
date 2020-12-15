package pl.polsl.student.javadockerapibroker.controllers;

import com.github.dockerjava.api.model.Info;
import com.github.dockerjava.api.model.Version;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.student.javadockerapibroker.services.impl.DockerInfoServiceImpl;

import javax.ws.rs.core.MediaType;

@Api(value = "Basic information about system and docker.")
@RequiredArgsConstructor
@RequestMapping("/info")
@RestController
public class DockerInfoController {

    private final DockerInfoServiceImpl dockerInfoService;

    @ApiOperation(value = "Get information about system.")
    @GetMapping(produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<Info> info() {
        return ResponseEntity.status(HttpStatus.OK).body(dockerInfoService.findInfo());
    }

    @ApiOperation(value = "Get version of docker, api, minimal api version, OS etc.")
    @GetMapping(value = "/version", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<Version> version() {
        return ResponseEntity.status(HttpStatus.OK).body(dockerInfoService.findVersion());
    }

    @ApiOperation(value = "")
    @GetMapping(value = "/events", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<?> events() {
        return ResponseEntity.status(HttpStatus.OK).body(dockerInfoService.findEvents());
    }

    @ApiOperation(value = "")
    @GetMapping(value = "/system/df", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<Object> dataUsage() {
        return ResponseEntity.status(HttpStatus.OK).body(dockerInfoService.findDataUsage());
    }
}
