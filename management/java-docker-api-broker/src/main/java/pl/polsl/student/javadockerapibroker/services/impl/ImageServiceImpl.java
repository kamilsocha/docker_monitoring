package pl.polsl.student.javadockerapibroker.services.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.BuildImageResultCallback;
import com.github.dockerjava.api.command.CreateImageResponse;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.command.PullImageResultCallback;
import com.github.dockerjava.api.model.Image;
import com.github.dockerjava.api.model.SearchItem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.student.javadockerapibroker.services.ImageService;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Service
public class ImageServiceImpl implements ImageService {

    private final DockerClient dockerClient;

    @Override
    public Image findOneImage(String id) {

        return dockerClient.listImagesCmd()
                .withShowAll(true)
                .exec()
                .stream()
                .filter(i -> i.getId().equals(id))
                .findAny()
                .orElse(null);
    }

    @Override
    public List<Image> findAllImages(Boolean showAll, Boolean dangling) {

        var listImagesCmd = dockerClient.listImagesCmd();

        if(showAll) {
            listImagesCmd.withShowAll(true);
        }
        if(dangling) {
            listImagesCmd.withDanglingFilter(true);
        }

        return listImagesCmd.exec();
    }

    @Override
    public CreateImageResponse createImage() {

//        dockerClient.createImageCmd(repository, inputStream);
        return null;
    }

    @Override
//    public String buildImage(ImageBuildDto imageBuildDto) {
    public String buildImage(MultipartFile tarArchive, Boolean withPull, Boolean withNoCache, Set<String> tags) {
        try {
            return dockerClient
                    .buildImageCmd(tarArchive.getInputStream())
                    .withPull(withPull)
                    .withNoCache(withNoCache)
                    .withTags(tags)
                    .exec(new BuildImageResultCallback())
                    .awaitImageId();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
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
    public boolean pullImage(String name, String tag, Long awaitCompletion) throws InterruptedException {
        log.warn("pulling image: " + name + ", " + tag);
        return dockerClient.pullImageCmd(name)
                .withTag(tag)
                .exec(new PullImageResultCallback())
                .awaitCompletion(awaitCompletion, TimeUnit.SECONDS);
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
