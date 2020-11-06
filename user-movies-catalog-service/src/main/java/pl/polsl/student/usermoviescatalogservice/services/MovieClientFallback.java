package pl.polsl.student.usermoviescatalogservice.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import pl.polsl.student.usermoviescatalogservice.domain.Movie;

@Component
public class MovieClientFallback implements MovieClient {
    @Override
    public ResponseEntity<Movie> findById(Long id) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Movie((long) 0, "Fallback movie name", "Fallback movie description", "Fallback movie director"));
    }
}
