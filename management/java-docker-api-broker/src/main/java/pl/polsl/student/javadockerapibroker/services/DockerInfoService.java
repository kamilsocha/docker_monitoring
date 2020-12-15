package pl.polsl.student.javadockerapibroker.services;

import com.github.dockerjava.api.model.Event;
import com.github.dockerjava.api.model.Info;
import com.github.dockerjava.api.model.Version;

import java.util.List;

public interface DockerInfoService {

    Info findInfo();
    Version findVersion();
    List<Event> findEvents();
    Object findDataUsage();
}
