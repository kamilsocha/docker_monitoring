package pl.polsl.student.javadockerapibroker.dto.docker;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContainerCreateDto {

    private String image;
    private List<String> cmd;
    private String name;
    private String hostName;
    private List<String> env;
    private List<String> portBindings;
    private List<String> binds;
}
