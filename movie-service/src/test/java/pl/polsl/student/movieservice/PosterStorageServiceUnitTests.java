package pl.polsl.student.movieservice;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.Resource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.student.movieservice.exception.PosterStorageException;
import pl.polsl.student.movieservice.services.impl.PosterStorageServiceImpl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class PosterStorageServiceUnitTests {

    @InjectMocks
    private PosterStorageServiceImpl posterStorageService;

    @BeforeEach
    public void init() {
        String uploadDir = "/uploads";
        ReflectionTestUtils.setField(posterStorageService, "uploadDirString", uploadDir);
        File dir = new File("/upload");
        File[] files = dir.listFiles();
        if(files != null) {
            for (var file : files) {
                if(!file.delete()) {
                    throw new RuntimeException("File deleting error");
                }
            }
        }
        try {
            MultipartFile multipartFile = new MockMultipartFile("file.jpg", "file.jpg", "image/jpg", Files.readAllBytes(Paths.get("src/test/resources/file.jpg")));
            posterStorageService.store(multipartFile);
        } catch (IOException e) {
            throw new RuntimeException("IOException thrown. Test file error.");
        }
    }

    @Test
    public void shouldStorePoster() {
        String uploadDir = "/uploads";
        ReflectionTestUtils.setField(posterStorageService, "uploadDirString", uploadDir);
        String file = "file.jpg";
        try {
            MultipartFile multipartFile = new MockMultipartFile("file.jpg", "file.jpg", "image/jpg", Files.readAllBytes(Paths.get("src/test/resources/file.jpg")));
            posterStorageService.store(multipartFile);
            assertTrue(Files.exists(Path.of(uploadDir + "/" + file)));
        } catch (IOException e) {
            fail("IOException thrown. Test file error.");
        }
    }

    @Test
    public void shouldThrowWhenStorePosterIsNull() {
        String uploadDir = "/uploads";
        ReflectionTestUtils.setField(posterStorageService, "uploadDirString", uploadDir);
        assertThrows(PosterStorageException.class, () -> {
            posterStorageService.store(null);
        });
    }

    @Test
    public void shouldThrowWhenStorePosterFilenameIsNull() {
        String uploadDir = "/uploads";
        ReflectionTestUtils.setField(posterStorageService, "uploadDirString", uploadDir);
        try {
            MultipartFile multipartFile = new MockMultipartFile("file.jpg", null, "image/jpg", Files.readAllBytes(Paths.get("src/test/resources/file.jpg")));
            assertThrows(PosterStorageException.class, () -> {
                posterStorageService.store(multipartFile);
            });
        } catch (IOException e) {
            fail("IOException thrown. Test file error.");
        }
    }

    @Test
    public void shouldThrowWhenStorePosterFileTypeIsWrong() {
        String uploadDir = "/uploads";
        ReflectionTestUtils.setField(posterStorageService, "uploadDirString", uploadDir);
        try {
            MultipartFile multipartFile = new MockMultipartFile("file.jpg", "file.mp3", "image/jpg", Files.readAllBytes(Paths.get("src/test/resources/file.jpg")));
            assertThrows(PosterStorageException.class, () -> {
                posterStorageService.store(multipartFile);
            });
        } catch (IOException e) {
            fail("IOException thrown. Test file error.");
        }
    }

    @Test
    public void shouldLoadAsResource() {
        String uploadDir = "/uploads";
        ReflectionTestUtils.setField(posterStorageService, "uploadDirString", uploadDir);
        String file = "file.jpg";
        Resource resource = posterStorageService.loadAsResource(file);
        assertNotNull(resource);
    }

    @Test
    public void shouldLoadAsResourceWhenFileIsNotFound() {
        String uploadDir = "/uploads";
        ReflectionTestUtils.setField(posterStorageService, "uploadDirString", uploadDir);
        String file = "notExistingFile.jpg";
        assertThrows(PosterStorageException.class, () -> {
            posterStorageService.loadAsResource(file);
        });
    }

    @Test
    public void shouldDeletePosterTest() {
        String uploadDir = "/uploads";
        ReflectionTestUtils.setField(posterStorageService, "uploadDirString", uploadDir);
        String file = "file.jpg";
        posterStorageService.delete(file);
        assertFalse(Files.exists(Path.of(uploadDir + "/" + file)));
    }

}
