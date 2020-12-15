package pl.polsl.student.javadockerapibroker.services;

import com.github.dockerjava.api.command.CreateVolumeResponse;
import com.github.dockerjava.api.command.InspectVolumeResponse;
import com.github.dockerjava.api.model.Volume;

import java.util.List;

public interface VolumeService {

    Volume findOneVolume();
    List<InspectVolumeResponse> findAllVolumes(Boolean dangling);
    InspectVolumeResponse inspectVolume(String name);
    CreateVolumeResponse createVolume(String name);
    void removeVolume(String name);

}
