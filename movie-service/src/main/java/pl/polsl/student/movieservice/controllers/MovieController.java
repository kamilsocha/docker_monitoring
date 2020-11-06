package pl.polsl.student.movieservice.controllers;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.movieservice.domain.Movie;
import pl.polsl.student.movieservice.services.MovieServiceImpl;

import java.util.LinkedHashSet;

@RequiredArgsConstructor
@RequestMapping("/movies")
@RestController
public class MovieController {

    private final MovieServiceImpl movieService;

    @ApiOperation(value = "Find all movies.")
    @GetMapping
    public LinkedHashSet<Movie> findAll() {
        return movieService.findAll();
    }

    @ApiOperation(value = "Retrieve details of specific movie.")
    @GetMapping("/{id}")
    public ResponseEntity<Movie> findById(@PathVariable Long id) {

        Movie movie = movieService.findById(id);
        final HttpStatus status = movie == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(movie);
    }

    @ApiOperation(value = "Save movie.")
    @PostMapping
    public ResponseEntity<Movie> create(@RequestBody Movie movie) {

        Movie entity = movieService.createMovie(movie);
        final HttpStatus status = entity == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.CREATED;
        return  ResponseEntity
                .status(status)
                .body(entity);
    }
}
