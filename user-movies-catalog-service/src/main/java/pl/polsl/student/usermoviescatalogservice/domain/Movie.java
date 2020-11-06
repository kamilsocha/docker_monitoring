package pl.polsl.student.usermoviescatalogservice.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@ApiModel(description = "Movie entity")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

    @ApiModelProperty(example = "1")
    private Long id;

    @ApiModelProperty(required = true, example = "The Conversation")
    private String name;

    @ApiModelProperty(required = true, example = "Wiretapping specialist tries to save two people")
    private String description;

    @ApiModelProperty(required = true, example = "Francis Ford Coppola")
    private String director;

//    private Integer length;
}
