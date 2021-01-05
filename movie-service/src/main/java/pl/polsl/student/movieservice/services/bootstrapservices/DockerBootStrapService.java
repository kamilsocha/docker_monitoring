package pl.polsl.student.movieservice.services.bootstrapservices;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import pl.polsl.student.movieservice.domain.MoviesJSON;
import pl.polsl.student.movieservice.enums.BootstrapLabel;
import pl.polsl.student.movieservice.services.impl.MovieServiceImpl;

import java.io.File;
import java.io.IOException;

@Slf4j
@Profile("docker")
@RequiredArgsConstructor
@Service
public class DockerBootStrapService extends BootStrapService {

    private final MovieServiceImpl movieService;

    @Value("${data.file}")
    private String dataFile;

    @Override
    protected void writeDefaults() {
        super.writeDefaults();
        entryService.createIfNotExists(BootstrapLabel.CREATE_DOCKER_MOVIES, this::createDockerMovies);
    }

    private void createDockerMovies() {
        var objectMapper = new ObjectMapper();
        var file = new File(dataFile);
        log.info("creating docker movies");
        if(file.exists()) {
            try {
                var moviesJSON = objectMapper.readValue(file, MoviesJSON.class);
                for(var movie : moviesJSON.getMovies()) {
                    movieService.createOneMovie(movie);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            log.info("file does not exist");
        }
    }

}
