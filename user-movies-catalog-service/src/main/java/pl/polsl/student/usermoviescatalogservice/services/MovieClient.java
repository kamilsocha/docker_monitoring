package pl.polsl.student.usermoviescatalogservice.services;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import pl.polsl.student.usermoviescatalogservice.domain.Movie;

@Api(value = "Movie API")
@FeignClient(value = "movie-service", fallback = MovieClientFallback.class)
public interface MovieClient {

    @ApiOperation(value = "Retrieve information about specific movie.", nickname = "findById")
    @GetMapping(value = "/movies/{id}", produces = "application/json")
    ResponseEntity<Movie> findById(@PathVariable Long id);
}

