package pl.polsl.student.managementapigateway.controllers;

import org.springframework.web.bind.annotation.*;
import pl.polsl.student.managementapigateway.services.ZuulDynamicRoutingService;

@RequestMapping("/routes")
@RestController
public class RouteController {

    private final ZuulDynamicRoutingService zuulDynamicRoutingService;

    public RouteController(ZuulDynamicRoutingService zuulDynamicRoutingService) {
        this.zuulDynamicRoutingService = zuulDynamicRoutingService;
    }

    @PostMapping
    public void prepareRoute(String name, String url) {
        zuulDynamicRoutingService.prepareRoute(name, url);
    }

    @DeleteMapping
    public void removeRoute(@RequestParam String name) {
        zuulDynamicRoutingService.removeRoute(name);
    }
}
