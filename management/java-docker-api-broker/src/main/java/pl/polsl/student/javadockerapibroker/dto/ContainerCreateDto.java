package pl.polsl.student.javadockerapibroker.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;

@ApiModel("Parameters used to create a container.")
@Getter
@Setter
@NoArgsConstructor
public class ContainerCreateDto {

    @ApiModelProperty(value = "Image from which to build a container.", example = "openjdk:8")
    @NotNull
    private String image;

    @ApiModelProperty("Command to run.")
    private List<String> cmd;

    @ApiModelProperty(value = "Name of the container.", example = "discovery")
    private String name;

    @ApiModelProperty(value = "Hostname to use.", example = "kamil-ubuntu")
    private String hostName;

    @ApiModelProperty(value = "A list of environment variables.", example = "EUREKA_URI=http://localhost:8761/eureka")
    private List<String> env;

    @ApiModelProperty(value = "Ports exposed and their mapping.", example = "8000:5432")
    private List<String> portBindings;

    @ApiModelProperty(value = "A list of volume bindings for the container.", example = "userdb:/var/lib/postgresql/data:rw")
    private List<String> binds;
}
