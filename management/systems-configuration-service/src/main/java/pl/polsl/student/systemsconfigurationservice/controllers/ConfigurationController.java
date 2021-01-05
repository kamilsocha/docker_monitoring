package pl.polsl.student.systemsconfigurationservice.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.student.systemsconfigurationservice.domain.SystemsConfig;
import pl.polsl.student.systemsconfigurationservice.services.impl.ConfigurationServiceImpl;

@RequestMapping("/config")
@RequiredArgsConstructor
@RestController
public class ConfigurationController {

    private final ConfigurationServiceImpl configurationService;

    @GetMapping
    public SystemsConfig getSystems() {
        return configurationService.getSystemsConfig();
    }
}
