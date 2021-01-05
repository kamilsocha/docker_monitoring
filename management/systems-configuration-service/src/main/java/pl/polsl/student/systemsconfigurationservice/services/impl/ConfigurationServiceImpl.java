package pl.polsl.student.systemsconfigurationservice.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import pl.polsl.student.systemsconfigurationservice.domain.SystemsConfig;
import pl.polsl.student.systemsconfigurationservice.services.ConfigurationService;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;

@Slf4j
@Service
@Configuration
@PropertySource("classpath:application.yml")
public class ConfigurationServiceImpl implements ConfigurationService {

    @Value("${config-file}")
    private String configFile;

    private SystemsConfig systemsConfig;

    @PostConstruct
    public void init() {
        ObjectMapper objectMapper = new ObjectMapper();
        var file = new File(configFile);
        try {
            systemsConfig = objectMapper.readValue(file, SystemsConfig.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public SystemsConfig getSystemsConfig() {
        log.debug("config fetch...");
        log.debug(systemsConfig.toString());
        return systemsConfig;
    }
}
