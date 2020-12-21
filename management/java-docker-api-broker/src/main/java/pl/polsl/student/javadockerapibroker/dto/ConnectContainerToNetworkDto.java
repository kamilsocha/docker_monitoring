package pl.polsl.student.javadockerapibroker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConnectContainerToNetworkDto {

    private String networkId;
    private String containerId;
    private String ipv4;
}
