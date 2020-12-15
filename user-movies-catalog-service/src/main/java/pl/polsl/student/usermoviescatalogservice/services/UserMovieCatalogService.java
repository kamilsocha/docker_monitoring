package pl.polsl.student.usermoviescatalogservice.services;

import pl.polsl.student.usermoviescatalogservice.domain.Movie;
import pl.polsl.student.usermoviescatalogservice.domain.UserMovieCatalogItem;

import java.util.LinkedHashSet;
import java.util.List;

public interface UserMovieCatalogService {

    LinkedHashSet<UserMovieCatalogItem> findAll();
    List<Movie> findAllMoviesForUser(Long userId);
    LinkedHashSet<UserMovieCatalogItem> findByUserId(Long id);
}
