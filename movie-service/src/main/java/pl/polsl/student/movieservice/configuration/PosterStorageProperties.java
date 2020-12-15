package pl.polsl.student.movieservice.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "poster")
public class PosterStorageProperties {

    private String uploadDir;
}
