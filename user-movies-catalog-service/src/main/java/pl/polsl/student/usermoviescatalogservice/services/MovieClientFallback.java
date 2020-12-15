package pl.polsl.student.usermoviescatalogservice.services;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.Cache.ValueWrapper;
import org.springframework.cache.CacheManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import pl.polsl.student.usermoviescatalogservice.domain.Movie;

import java.util.List;

//@RequiredArgsConstructor
@Component
public class MovieClientFallback implements MovieClient {

//    private final CacheManager cacheManager;

    @Override
    public ResponseEntity<Movie> findById(Long id) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Movie((long) 0, "Fallback movie name", "Fallback movie description", "Fallback movie director", ""));
//        ValueWrapper w = cacheManager.getCache("movies").get(id);
//        if(w != null) {
//            return ResponseEntity
//                    .status(HttpStatus.REQUEST_TIMEOUT)
//                    .body((Movie) w);
//        } else {
//            return ResponseEntity
//                    .status(HttpStatus.NOT_FOUND)
//                    .body(
//                            new Movie((long) 0,
//                                    "Fallback movie name",
//                                    "Fallback movie description",
//                                    "Fallback movie director"
//                            ));
//        }
    }

    @Override
    public List<Movie> findAllButSpecified(Long[] idsToFilterOut) {
        return null;
    }
}
