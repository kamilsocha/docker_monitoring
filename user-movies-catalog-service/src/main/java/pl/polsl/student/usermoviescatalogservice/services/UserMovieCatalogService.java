package pl.polsl.student.usermoviescatalogservice.services;

import pl.polsl.student.usermoviescatalogservice.domain.UserMovieCatalogItem;

import java.util.LinkedHashSet;

public interface UserMovieCatalogService {

    LinkedHashSet<UserMovieCatalogItem> findAll();
    LinkedHashSet<UserMovieCatalogItem> findByUserId(Long id);
}
