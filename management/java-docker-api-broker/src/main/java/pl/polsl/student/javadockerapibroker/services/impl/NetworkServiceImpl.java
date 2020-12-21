package pl.polsl.student.javadockerapibroker.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateNetworkResponse;
import com.github.dockerjava.api.model.ContainerNetwork;
import com.github.dockerjava.api.model.Network;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.polsl.student.javadockerapibroker.dto.ConnectContainerToNetworkDto;
import pl.polsl.student.javadockerapibroker.dto.CreateNetworkDto;
import pl.polsl.student.javadockerapibroker.services.NetworkService;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NetworkServiceImpl implements NetworkService {

    private final DockerClient dockerClient;

    @Override
    public List<Network> findAllNetworks() {
        return dockerClient.listNetworksCmd().exec();
    }

    @Override
    public CreateNetworkResponse createNetwork(CreateNetworkDto dto) {
        var createNetworkCmd = dockerClient.createNetworkCmd();

        var config = new Network.Ipam.Config();
        if(!dto.getGateway().equals("")) {
            config.withGateway(dto.getGateway());
        }

        if(!dto.getSubnet().equals("")) {
            config.withSubnet(dto.getSubnet());
        }

        if(!dto.getIpRange().equals("")) {
            config.withIpRange(dto.getIpRange());
        }

        var ipam = new Network.Ipam().withConfig(config);

        return createNetworkCmd
                .withName(dto.getName())
                .withDriver(dto.getDriver())
                .withIpam(ipam)
                .exec();
    }

    @Override
    public Network inspectNetwork(String id) {
        return dockerClient.inspectNetworkCmd()
                .withNetworkId(id)
                .exec();
    }

    @Override
    public void connectContainerToNetwork(ConnectContainerToNetworkDto dto) {
        var containerNetwork = new ContainerNetwork();
        if(!dto.getIpv4().equals("")) {
            containerNetwork.withIpv4Address(dto.getIpv4());
        }
        dockerClient.connectToNetworkCmd()
                .withNetworkId(dto.getNetworkId())
                .withContainerId(dto.getContainerId())
                .withContainerNetwork(containerNetwork)
                .exec();
    }

    @Override
    public void removeNetwork(String id) {
        dockerClient.removeNetworkCmd(id).exec();
    }
}
