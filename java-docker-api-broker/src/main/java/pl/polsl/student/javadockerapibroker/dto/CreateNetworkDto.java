package pl.polsl.student.javadockerapibroker.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@ApiModel("Parameters required to create network.")
@Getter
@Setter
@NoArgsConstructor
public class CreateNetworkDto {

    @ApiModelProperty(value = "Name of the network.", required = true, example = "backend")
    @NotNull
    private String name;

    @ApiModelProperty(value = "Network gateway value.", required = false)
    private String gateway;

    @ApiModelProperty(value = "Network subnet value.", example = "172.17.0.0/16")
    private String subnet;

    @ApiModelProperty(value = "Network ip range value.", example = "172.17.5.0/24")
    private String ipRange;

    @ApiModelProperty(value = "Network driver.", example = "bridge")
    private String driver;

}
