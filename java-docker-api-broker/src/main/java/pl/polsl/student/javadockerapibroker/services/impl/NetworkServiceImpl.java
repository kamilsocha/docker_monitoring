package pl.polsl.student.javadockerapibroker.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateNetworkResponse;
import com.github.dockerjava.api.model.Network;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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
        var config = new Network.Ipam.Config()
                .withGateway(dto.getGateway())
                .withSubnet(dto.getSubnet())
                .withIpRange(dto.getIpRange());
        var ipam = new Network.Ipam()
                .withConfig(config);

        return dockerClient.createNetworkCmd()
                .withName(dto.getName())
                .withIpam(ipam)
                .withDriver(dto.getDriver())
                .exec();
    }

    @Override
    public Network inspectNetwork(String id) {
        return dockerClient.inspectNetworkCmd()
                .withNetworkId(id)
                .exec();
    }

    @Override
    public void removeNetwork(String id) {
        dockerClient.removeNetworkCmd(id).exec();
    }
}
