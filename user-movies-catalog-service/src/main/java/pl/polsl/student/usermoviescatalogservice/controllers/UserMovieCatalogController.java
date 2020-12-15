package pl.polsl.student.usermoviescatalogservice.controllers;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.usermoviescatalogservice.domain.Movie;
import pl.polsl.student.usermoviescatalogservice.domain.UserMovieCatalogItem;
import pl.polsl.student.usermoviescatalogservice.services.MovieClient;
import pl.polsl.student.usermoviescatalogservice.services.UserMovieCatalogServiceImpl;

import java.util.LinkedHashSet;
import java.util.List;

//@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/catalog")
@RestController
public class UserMovieCatalogController {

    private final UserMovieCatalogServiceImpl userMovieCatalogService;

    private final MovieClient movieClient;

    @ApiOperation(value = "Get movies not yet rated by user.")
//    @HystrixCommand
    @GetMapping("/all/{userId}")
    public List<Movie> findAllMoviesForUser(@PathVariable Long userId) {
        return userMovieCatalogService.findAllMoviesForUser(userId);
    }

    @ApiOperation(value = "Get movies rated by user with details and rating.")
//    @HystrixCommand
    @GetMapping("/{userId}")
    public LinkedHashSet<UserMovieCatalogItem> findByUserId(@PathVariable Long userId) {
        return userMovieCatalogService.findByUserId(userId);
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<Movie> findMovieById(@PathVariable Long movieId) {
        return movieClient.findById(movieId);
    }

}
