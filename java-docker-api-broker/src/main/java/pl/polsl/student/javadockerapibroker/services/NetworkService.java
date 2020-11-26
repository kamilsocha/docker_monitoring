package pl.polsl.student.javadockerapibroker.services;

import com.github.dockerjava.api.command.CreateNetworkResponse;
import com.github.dockerjava.api.model.Network;
import pl.polsl.student.javadockerapibroker.dto.CreateNetworkDto;

import java.util.List;

public interface NetworkService {

    List<Network> findAllNetworks();
    CreateNetworkResponse createNetwork(CreateNetworkDto createNetworkDto);
    Network inspectNetwork(String id);
    void removeNetwork(String id);
}
