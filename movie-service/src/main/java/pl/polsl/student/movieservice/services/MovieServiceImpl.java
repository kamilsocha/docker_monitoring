package pl.polsl.student.movieservice.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.polsl.student.movieservice.domain.Movie;
import pl.polsl.student.movieservice.repositories.MovieRepository;

import java.util.LinkedHashSet;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MovieServiceImpl implements MovieService {

    Logger logger = LoggerFactory.getLogger(MovieServiceImpl.class);

    @Value("${server.port}")
    private Integer port;

    private final MovieRepository movieRepository;

    @Override
    public LinkedHashSet<Movie> findAll() {
        logger.warn("Processing request find all... Port: " + port);
        return movieRepository
                .findAll()
                .stream()
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    @Override
    public Movie findById(Long id) {
        logger.warn("Processing request: find by id: " + id + "... Port: " + port);
        return movieRepository
                .findById(id)
                .orElse(null);
    }

    @Override
    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }
}
