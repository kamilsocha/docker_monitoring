package pl.polsl.student.managementapigateway.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.student.managementapigateway.configuration.SystemsConfig;
import pl.polsl.student.managementapigateway.services.impl.ConfigurationServiceImpl;

@RequestMapping("/systems-configuration")
@RequiredArgsConstructor
@RestController
public class ConfigurationController {

    private final ConfigurationServiceImpl configurationService;

    @GetMapping
    public SystemsConfig getSystems() {
        return configurationService.getSystemsConfig();
    }
}
