package pl.polsl.student.movieservice.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.polsl.student.movieservice.domain.Movie;

import java.util.List;

public interface MovieService {

    Page<Movie> findAll(Pageable pageable);
    List<Movie> findAllButSpecified(Long[] idsToFilterOut);
    Movie findById(Long id);
    Movie createOneMovie(Movie movie);
    boolean delete(Long id);
}
