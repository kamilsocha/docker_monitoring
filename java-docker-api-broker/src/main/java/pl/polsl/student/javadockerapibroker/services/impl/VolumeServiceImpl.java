package pl.polsl.student.javadockerapibroker.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateVolumeResponse;
import com.github.dockerjava.api.command.InspectVolumeResponse;
import com.github.dockerjava.api.command.ListVolumesResponse;
import com.github.dockerjava.api.model.Volume;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.polsl.student.javadockerapibroker.services.VolumeService;

import java.util.List;

@RequiredArgsConstructor
@Service
public class VolumeServiceImpl implements VolumeService {

    private final DockerClient dockerClient;


    @Override
    public Volume findOneVolume() {
        return null;
    }

    @Override
    public List<InspectVolumeResponse> findAllVolumes(Boolean dangling) {
        ListVolumesResponse volumesResponse = dockerClient.listVolumesCmd()
                                                .withDanglingFilter(dangling)
                                                .exec();
        return volumesResponse.getVolumes();
    }

    @Override
    public InspectVolumeResponse inspectVolume(String name) {
        return dockerClient.inspectVolumeCmd(name).exec();
    }

    @Override
    public CreateVolumeResponse createVolume() {
        return null;
    }

    @Override
    public void removeVolume(String id) {

    }
}
