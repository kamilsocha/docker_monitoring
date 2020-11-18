package pl.polsl.student.javadockerapibroker.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateImageResponse;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.command.PullImageResultCallback;
import com.github.dockerjava.api.model.Image;
import com.github.dockerjava.api.model.SearchItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.polsl.student.javadockerapibroker.services.ImageService;

import java.util.List;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Service
public class ImageServiceImpl implements ImageService {

    private final DockerClient dockerClient;

    @Override
    public Image findOneImage(String id) {
        return null;
    }

    @Override
    public List<Image> findAllImages(Boolean showAll, Boolean dangling) {
        return dockerClient.listImagesCmd()
                .withShowAll(showAll)
                .withDanglingFilter(dangling)
                .exec();
    }

    @Override
    public CreateImageResponse createImage() {

//        dockerClient.createImageCmd(repository, inputStream);
        return null;
    }

    @Override
    public String buildImage() {
        return null;
    }

    @Override
    public InspectImageResponse inspectImage(String id) {
        return dockerClient.inspectImageCmd(id).exec();
    }

    @Override
    public void tagImage() {

    }

    @Override
    public void pushImage() {

    }

    @Override
    public void pullImage(String name, String tag, Long awaitCompletion) throws InterruptedException {
        Object res = dockerClient.pullImageCmd(name)
                .withTag(tag)
                .exec(new PullImageResultCallback())
                .awaitCompletion(awaitCompletion, TimeUnit.SECONDS);
        String r = "asb";
        System.out.println(r);
    }

    @Override
    public void removeImage(String id) {
        dockerClient.removeImageCmd(id).exec();
    }

    @Override
    public List<SearchItem> searchImages(String name) {

        return dockerClient.searchImagesCmd(name).exec();
    }
}
