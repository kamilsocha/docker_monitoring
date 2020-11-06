package pl.polsl.student.movieservice.services;

import pl.polsl.student.movieservice.domain.Movie;

import java.util.LinkedHashSet;

public interface MovieService {

    LinkedHashSet<Movie> findAll();
    Movie findById(Long id);
    Movie createMovie(Movie movie);
}
