package pl.polsl.student.movieservice.services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PosterStorageService {

    String store(MultipartFile file);
    Resource loadAsResource(String filename);
    boolean delete(String filename);
}
