package pl.polsl.student.javadockerapibroker.services;

import com.github.dockerjava.api.command.CreateImageResponse;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.model.Image;
import com.github.dockerjava.api.model.SearchItem;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface ImageService {

    Image findOneImage(String id);
    List<Image> findAllImages(Boolean showAll, Boolean dangling);
   CreateImageResponse createImage();
//    String buildImage(ImageBuildDto imageBuildDto);
    String buildImage(MultipartFile tarArchive, Boolean withPull, Boolean withNoCache, Set<String> tags);
    InspectImageResponse inspectImage(String id);
    // repository needed
    void tagImage();
    void pushImage();
    void pullImage(String name, String tag, Long awaitCompletion) throws InterruptedException;
    void removeImage(String id);
    //
    List<SearchItem> searchImages(String name);
}
