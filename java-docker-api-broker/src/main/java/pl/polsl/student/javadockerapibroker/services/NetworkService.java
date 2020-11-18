package pl.polsl.student.javadockerapibroker.services;

import com.github.dockerjava.api.command.CreateNetworkResponse;
import com.github.dockerjava.api.model.Network;

import java.util.List;

public interface NetworkService {

    List<Network> findNetworks();
    // name, subnet, ipRange, driver
    CreateNetworkResponse createNetwork();
    Network inspectNetwork(String id);
    void removeNetwork(String id);
}
