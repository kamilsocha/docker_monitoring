package pl.polsl.student.managementapigateway.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import pl.polsl.student.managementapigateway.services.ZuulDynamicRoutingService;

import java.net.UnknownHostException;

@Slf4j
@RequestMapping("/routes")
@RestController
public class RouteController {

    private final ZuulDynamicRoutingService zuulDynamicRoutingService;

    private final RestTemplate restTemplate;

    public RouteController(ZuulDynamicRoutingService zuulDynamicRoutingService, RestTemplate restTemplate) {
        this.zuulDynamicRoutingService = zuulDynamicRoutingService;
        this.restTemplate = restTemplate;
    }

    @PostMapping
    public Object prepareRoute(@RequestParam String name, @RequestParam String url) throws UnknownHostException {
        zuulDynamicRoutingService.prepareRoute(name, url);
        Object res = restTemplate.getForObject(url + "/actuator", Object.class);;
        return res;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping
    public void removeRoute(@RequestParam String name) {
        String nameToRemove = name.replace("/", "");
        nameToRemove = nameToRemove.replace("*", "");
        zuulDynamicRoutingService.removeRoute(nameToRemove);
    }
}
