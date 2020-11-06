package pl.polsl.student.ratingservice.controllers;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.ratingservice.domain.Rating;
import pl.polsl.student.ratingservice.domain.UserRatings;
import pl.polsl.student.ratingservice.services.RatingServiceImpl;

import java.util.LinkedHashSet;

@RequiredArgsConstructor
@RequestMapping("/ratings")
@RestController
public class RatingController {

    private final RatingServiceImpl ratingService;

    @ApiOperation(value = "Find all ratings.")
    @GetMapping
    public LinkedHashSet<Rating> findAll() {
        return ratingService.findAll();
    }

    @ApiOperation(value = "Retrieve all ratings from specific user.")
    @GetMapping("/{userId}")
    public UserRatings ratingsByUserId(@PathVariable Long userId) {

        return new UserRatings(
                ratingService.findByUserId(userId)
        );
    }

    @ApiOperation(value = "Create rating.")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Rating> create(@RequestBody Rating rating) {
        Rating entity = ratingService.createRating(rating);
        final HttpStatus status = entity == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.CREATED;
        return  ResponseEntity
                .status(status)
                .body(entity);
    }
}
