package pl.polsl.student.ratingservice.services;

import pl.polsl.student.ratingservice.domain.Rating;

import java.util.LinkedHashSet;
import java.util.List;

public interface RatingService {

    LinkedHashSet<Rating> findAll();
    List<Rating> findByUserId(Long userId);
    Rating createRating(Rating rating);
}
