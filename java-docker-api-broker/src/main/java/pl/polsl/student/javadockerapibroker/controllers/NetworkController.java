package pl.polsl.student.javadockerapibroker.controllers;

import com.github.dockerjava.api.command.CreateNetworkResponse;
import com.github.dockerjava.api.model.Network;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.javadockerapibroker.dto.CreateNetworkDto;
import pl.polsl.student.javadockerapibroker.services.impl.NetworkServiceImpl;

import java.util.List;

@Api(value = "docker networks management")
@RequiredArgsConstructor
@RequestMapping("/networks")
@RestController
public class NetworkController {

    private final NetworkServiceImpl networkService;

    @ApiOperation(value = "Find all networks.")
    @GetMapping
    public List<Network> findAll() {
        return networkService.findAllNetworks();
    }

    @ApiOperation(value = "Inspect a network")
    @GetMapping("/{id}/inspect")
    public ResponseEntity<Network> inspect(@PathVariable String id) {
        var res = networkService.inspectNetwork(id);
        var status = res == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(res);
    }

    @ApiOperation(value = "Create network.")
    @PostMapping
    public ResponseEntity<CreateNetworkResponse> create(CreateNetworkDto createNetworkDto) {
        var res = networkService.createNetwork(createNetworkDto);
        var status = res == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.CREATED;
        return ResponseEntity
                .status(status)
                .body(res);
    }

    @ApiOperation(value = "Remove network.", notes = "Remove network using its name or id.")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@ApiParam(value = "Identifier of network. It can be network's id or name.") @PathVariable String id) {
        networkService.removeNetwork(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .build();
    }

}
