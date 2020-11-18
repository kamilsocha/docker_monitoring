package pl.polsl.student.javadockerapibroker.controllers;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.student.javadockerapibroker.services.impl.NetworkServiceImpl;

@Api(value = "docker networks management")
@RequiredArgsConstructor
@RequestMapping("/networks")
@RestController
public class NetworkController {

    private final NetworkServiceImpl networkService;


}
