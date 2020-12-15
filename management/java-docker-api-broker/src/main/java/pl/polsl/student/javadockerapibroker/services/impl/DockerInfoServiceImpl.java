package pl.polsl.student.javadockerapibroker.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Event;
import com.github.dockerjava.api.model.Info;
import com.github.dockerjava.api.model.Version;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.polsl.student.javadockerapibroker.services.DockerInfoService;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DockerInfoServiceImpl implements DockerInfoService{

    private final DockerClient dockerClient;

    @Override
    public Info findInfo() {
        return dockerClient.infoCmd().exec();
    }

    @Override
    public Version findVersion() {
        return dockerClient.versionCmd().exec();
    }

    @Override
    public List<Event> findEvents() {
//        return dockerClient.eventsCmd().exec();
        return null;
    }

    @Override
    public Object findDataUsage() {
        return null;
    }


}
