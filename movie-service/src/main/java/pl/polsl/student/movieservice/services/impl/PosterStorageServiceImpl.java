package pl.polsl.student.movieservice.services.impl;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.student.movieservice.configuration.PosterStorageProperties;
import pl.polsl.student.movieservice.exception.PosterStorageException;
import pl.polsl.student.movieservice.services.PosterStorageService;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class PosterStorageServiceImpl implements PosterStorageService {

    private final Path posterFileLocation;

    public PosterStorageServiceImpl(PosterStorageProperties posterStorageProperties) {
        this.posterFileLocation = Paths.get(posterStorageProperties.getUploadDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.posterFileLocation);
        } catch (Exception e) {
            throw new PosterStorageException("Path not found.", e);
        }
    }

    @Override
    public String store(MultipartFile file) throws IOException {

        if(!(file.getOriginalFilename().endsWith(".png") || file.getOriginalFilename().endsWith(".jpeg") || file.getOriginalFilename().endsWith(".jpg"))) {
            throw new PosterStorageException("Invalid file format.");
        }

//        File f = new File("C://tmp//" + file.getOriginalFilename());
        File f = new File("./" + file.getOriginalFilename());

        f.createNewFile();
        FileOutputStream fout = new FileOutputStream(f);
        fout.write(file.getBytes());
        fout.close();
        BufferedImage image = ImageIO.read(f);
        int height = image.getHeight();
        int width = image.getWidth();
        if (width > 1200 || height > 1200) {
            if(f.exists()) f.delete();
            throw new PosterStorageException("Invalid poster dimensions.");
        }

        if(f.exists()) f.delete();

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if(fileName.contains("..")) {
                throw new PosterStorageException("Invalid path name.");
            }
            String newFileName = System.currentTimeMillis() + "_" + fileName;
            Path targetLocation = this.posterFileLocation.resolve(newFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return newFileName;
        } catch (IOException e) {
            throw new PosterStorageException("Create file exception.", e);
        }
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path filePath = this.posterFileLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new PosterStorageException("File " + filename+ " not found");
            }
        } catch (MalformedURLException e) {
            System.out.println("File not found");
        }
        return null;
    }
}
