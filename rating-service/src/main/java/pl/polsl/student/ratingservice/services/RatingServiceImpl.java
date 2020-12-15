package pl.polsl.student.ratingservice.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.polsl.student.ratingservice.domain.Rating;
import pl.polsl.student.ratingservice.exceptions.RatingNotFoundException;
import pl.polsl.student.ratingservice.repositories.RatingRepository;

import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RatingServiceImpl implements RatingService {

    Logger logger = LoggerFactory.getLogger(RatingServiceImpl.class);

    @Value("${server.port}")
    private Integer port;

    private final RatingRepository ratingRepository;

    @Override
    public LinkedHashSet<Rating> findAll() {
        logger.warn("Processing request: find all... Port: " + port);
        return ratingRepository.findAll()
                .stream()
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    @Override
    public List<Rating> findByUserId(Long userId) {
        logger.warn("Processing request: find by id: " + userId + "... Port: " + port);
        return ratingRepository.findByUserId(userId);
    }

    @Override
    public Rating createRating(Rating rating) {
        logger.warn("Processing request: create rating... Port: " + port);
        return ratingRepository.save(rating);
    }

    @Override
    public Rating updateRating(Long id, Double rating) {
        logger.warn("Processing request: update rating... Port: " + port);
        Rating ratingEntity = ratingRepository.findById(id).orElseThrow(() -> new RatingNotFoundException("Rating with id: " + id + " was not found"));
        ratingEntity.setRating(rating);
        return ratingRepository.save(ratingEntity);
    }

    @Override
    public void deleteRating(Long id) {
        logger.warn("Processing request: delete rating... Port: " + port);
        ratingRepository.deleteById(id);
    }
}
