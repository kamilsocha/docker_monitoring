package pl.polsl.student.usermoviescatalogservice.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@ApiModel("Catalog item representing user's movie ratings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserMovieCatalogItem {

    @ApiModelProperty(value = "Name of the movie", example = "The Conversation")
    private String name;

    @ApiModelProperty(example = "Wiretapping specialist tries to save two people")
    private String description;

    @ApiModelProperty(example = "2.0")
    private Double rating;
}
