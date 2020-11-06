package pl.polsl.student.usermoviescatalogservice.services;

import org.springframework.stereotype.Component;
import pl.polsl.student.usermoviescatalogservice.domain.Rating;
import pl.polsl.student.usermoviescatalogservice.domain.UserRatings;

import java.util.Arrays;

@Component
public class RatingClientFallback implements RatingClient {

    @Override
    public UserRatings ratingsByUserId(Long userId) {
        return new UserRatings(
                Arrays.asList(
                        new Rating((long) 0, (long) 0, (long) 0, 0.0),
                        new Rating((long) 0, (long) 0, (long) 0, 0.0),
                        new Rating((long) 0, (long) 0, (long) 0, 0.0)
                )
        );
    }
}
