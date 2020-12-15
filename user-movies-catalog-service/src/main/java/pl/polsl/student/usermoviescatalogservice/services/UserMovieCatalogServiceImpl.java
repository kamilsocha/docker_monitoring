package pl.polsl.student.usermoviescatalogservice.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.polsl.student.usermoviescatalogservice.domain.Movie;
import pl.polsl.student.usermoviescatalogservice.domain.Rating;
import pl.polsl.student.usermoviescatalogservice.domain.UserMovieCatalogItem;
import pl.polsl.student.usermoviescatalogservice.domain.UserRatings;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserMovieCatalogServiceImpl implements UserMovieCatalogService {

    @Value("${server.port}")
    private Integer port;

    private final MovieClient movieClient;

    private final RatingClient ratingClient;

//    private final MovieClient movieClient = Feign.builder()
//            .client(new OkHttpClient())
//            .encoder(new GsonEncoder())
//            .decoder(new GsonDecoder())
//            .logger(new Slf4jLogger())
//            .logLevel(Logger.Level.FULL)
//            .target(MovieClient.class, "")

    @Override
    public LinkedHashSet<UserMovieCatalogItem> findAll() {
        // get all movies
        // get all ratings
        // assign ratings to movies
        return null;
    }

    @Override
    public List<Movie> findAllMoviesForUser(Long userId) {
        UserRatings userRatings = ratingClient.ratingsByUserId(userId);
        Set<Long> movieIds = userRatings.getRatings().stream().map(Rating::getMovieId).collect(Collectors.toCollection(LinkedHashSet::new));

        return movieClient.findAllButSpecified(movieIds.stream().toArray(m -> new Long[m]));
    }

    @Override
    public LinkedHashSet<UserMovieCatalogItem> findByUserId(Long userId) {

        log.warn("Processing request... Port: " + port);
        UserRatings userRatings = ratingClient.ratingsByUserId(userId);
        return userRatings.getRatings().stream()
                .map(this::getMovieCatalogItem)
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    private UserMovieCatalogItem getMovieCatalogItem(Rating rating) {
        Movie movie = movieClient.findById(rating.getMovieId()).getBody();
        return movie != null ? new UserMovieCatalogItem(movie.getId(), movie.getName(), movie.getDescription(), movie.getDirector(), movie.getPosterUri(), rating.getId(), rating.getRating()) : null;
    }
}
