package pl.polsl.student.usermoviescatalogservice.domain;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@ApiModel("User ratings wrapper")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRatings {

    private List<Rating> ratings;
}
