package pl.polsl.student.ratingservice.services.bootstrapservices;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import pl.polsl.student.ratingservice.domain.RatingsJSON;
import pl.polsl.student.ratingservice.enums.BootstrapLabel;
import pl.polsl.student.ratingservice.services.RatingServiceImpl;

import java.io.File;
import java.io.IOException;

@Slf4j
@Profile("docker")
@RequiredArgsConstructor
@Service
public class DockerBootStrapService extends BootStrapService {

    private final RatingServiceImpl ratingService;

    @Value("${data.file}")
    private String dataFile;

    @Override
    protected void writeDefaults() {
        super.writeDefaults();
        entryService.createIfNotExists(BootstrapLabel.CREATE_DOCKER_RATINGS, this::createDockerMovies);
    }

    private void createDockerMovies() {
        var objectMapper = new ObjectMapper();
        var file = new File(dataFile);
        if(file.exists()) {
            try {
                var moviesJSON = objectMapper.readValue(file, RatingsJSON.class);
                for(var rating : moviesJSON.getRatings()) {
                    ratingService.createRating(rating);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
