package pl.polsl.student.movieservice.services.impl;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.student.movieservice.exception.PosterStorageException;
import pl.polsl.student.movieservice.services.PosterStorageService;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Slf4j
@NoArgsConstructor
@Service
public class PosterStorageServiceImpl implements PosterStorageService {

    @Value("${poster.upload-dir}")
    private String uploadDirString;

    private Path uploadDir;

    @Override
    public String store(MultipartFile file) {

        if(file == null || file.getOriginalFilename() == null) {
            throw new PosterStorageException("Invalid file.");
        }

        if(!(file.getOriginalFilename().endsWith(".png") || file.getOriginalFilename().endsWith(".jpeg") || file.getOriginalFilename().endsWith(".jpg"))) {
            throw new PosterStorageException("Invalid file format.");
        }

        if(uploadDir == null || !Files.exists(uploadDir)) {
            this.uploadDir = Paths.get(uploadDirString).toAbsolutePath().normalize();
            try {
                Files.createDirectories(this.uploadDir);
            } catch (Exception e) {
                throw new PosterStorageException("Path not found.", e);
            }
        }

        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if(filename.contains("..")) {
                throw new PosterStorageException("Invalid path name.");
            }
            Path targetLocation = this.uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return filename;
        } catch (IOException e) {
            throw new PosterStorageException("Create file exception.", e);
        }
    }

    @Override
    public Resource loadAsResource(String filename) {
        if(uploadDir == null || !Files.exists(uploadDir)) {
            this.uploadDir = Paths.get(uploadDirString).toAbsolutePath().normalize();
            try {
                Files.createDirectories(this.uploadDir);
            } catch (Exception e) {
                throw new PosterStorageException("Path not found.", e);
            }
        }
        try {
            Path filePath = this.uploadDir.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                log.info("file does not exist");
                throw new PosterStorageException("File " + filename + " not found");
            }
        } catch (MalformedURLException e) {
            log.info("malformed url exception");
        }
        return null;
    }

    @Override
    public boolean delete(String filename) {
        try {
            Path filePath = this.uploadDir.resolve(filename).normalize();
            return Files.deleteIfExists(filePath);
        } catch(IOException e){
            throw new PosterStorageException("File deleting error: " + e.getMessage());
        }
    }
}
