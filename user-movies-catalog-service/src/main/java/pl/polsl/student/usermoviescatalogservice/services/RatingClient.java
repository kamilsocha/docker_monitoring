package pl.polsl.student.usermoviescatalogservice.services;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import pl.polsl.student.usermoviescatalogservice.domain.UserRatings;

@Api(value = "Rating API")
@FeignClient(value = "rating-service", fallback = RatingClientFallback.class)
public interface RatingClient {

    @ApiOperation(value = "", nickname = "ratingsByUserId")
    @GetMapping(value = "/ratings/{userId}", produces = "application/json")
    UserRatings ratingsByUserId(@PathVariable Long userId);
}
