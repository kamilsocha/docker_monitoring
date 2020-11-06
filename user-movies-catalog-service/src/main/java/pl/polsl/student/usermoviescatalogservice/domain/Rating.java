package pl.polsl.student.usermoviescatalogservice.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@ApiModel("Rating entity")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating {

    @ApiModelProperty(example = "1")
    private Long id;

    @ApiModelProperty(example = "1")
    private Long movieId;

    @ApiModelProperty(example = "1")
    private Long userId;

    @ApiModelProperty(example = "1.0")
    private Double rating;
}
