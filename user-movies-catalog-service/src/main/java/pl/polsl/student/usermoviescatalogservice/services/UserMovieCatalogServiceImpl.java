package pl.polsl.student.usermoviescatalogservice.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.polsl.student.usermoviescatalogservice.domain.Movie;
import pl.polsl.student.usermoviescatalogservice.domain.Rating;
import pl.polsl.student.usermoviescatalogservice.domain.UserMovieCatalogItem;
import pl.polsl.student.usermoviescatalogservice.domain.UserRatings;

import java.util.LinkedHashSet;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserMovieCatalogServiceImpl implements UserMovieCatalogService {

    Logger logger = LoggerFactory.getLogger(UserMovieCatalogServiceImpl.class);

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
        return null;
    }

    @Override
    public LinkedHashSet<UserMovieCatalogItem> findByUserId(Long userId) {

        logger.warn("Processing request... Port: " + port);

        UserRatings userRatings = ratingClient.ratingsByUserId(userId);
        return userRatings.getRatings().stream()
                .map(this::getMovieCatalogItem)
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    private UserMovieCatalogItem getMovieCatalogItem(Rating rating) {
        Movie movie = movieClient.findById(rating.getMovieId()).getBody();
        return movie != null ? new UserMovieCatalogItem(movie.getName(), movie.getDescription(), rating.getRating()) : null;
    }
}
