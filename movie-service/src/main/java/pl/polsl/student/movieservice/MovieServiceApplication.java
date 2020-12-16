package pl.polsl.student.movieservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.student.movieservice.configuration.PosterStorageProperties;

@EnableConfigurationProperties( { PosterStorageProperties.class } )
@EnableEurekaClient
@SpringBootApplication
@RestController
public class MovieServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieServiceApplication.class, args);
	}

	@GetMapping
	public String home() {
		return "movie-service";
	}

}
