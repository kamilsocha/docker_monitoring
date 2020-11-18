package pl.polsl.student.javadockerapibroker.services;

import com.github.dockerjava.api.command.CreateImageResponse;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.model.Image;
import com.github.dockerjava.api.model.SearchItem;

import java.util.List;

public interface ImageService {

    Image findOneImage(String id);
    List<Image> findAllImages(Boolean showAll, Boolean dangling);
   CreateImageResponse createImage();
   // BuildImageResultCallback
    String buildImage();
    InspectImageResponse inspectImage(String id);
    // repository needed
    void tagImage();
    void pushImage();
    void pullImage(String name, String tag, Long awaitCompletion) throws InterruptedException;
    void removeImage(String id);
    //
    List<SearchItem> searchImages(String name);
}
