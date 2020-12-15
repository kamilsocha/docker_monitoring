package pl.polsl.student.movieservice.services.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.polsl.student.movieservice.domain.Movie;
import pl.polsl.student.movieservice.repositories.MovieRepository;
import pl.polsl.student.movieservice.services.MovieService;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class MovieServiceImpl implements MovieService {

    @Value("${server.port}")
    private Integer port;

    private final MovieRepository movieRepository;

    @Override
    public Page<Movie> findAll(Pageable pageable) {
        log.warn("Processing request... Find all... Port: " + port);
        return movieRepository.findAll(pageable);
    }

    @Override
    public List<Movie> findAllButSpecified(Long[] idsToFilterOut) {
        return movieRepository.findAllByIdNotIn(idsToFilterOut);
    }

    @Override
    public Movie findById(Long id) {
        log.warn("Processing request... Find by id: " + id + "... Port: " + port);
        return movieRepository
                .findById(id)
                .orElse(null);
    }

    @Override
    public Movie createOneMovie(Movie movie) {
        log.warn("Processing Request... Creating movie: " + movie.toString() + "... Port: " + port);
        return movieRepository.save(movie);
    }

    @Override
    public void delete(Long id) {
        movieRepository.deleteById(id);
    }
}
