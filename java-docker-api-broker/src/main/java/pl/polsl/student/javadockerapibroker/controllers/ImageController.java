package pl.polsl.student.javadockerapibroker.controllers;

import com.github.dockerjava.api.command.CreateImageResponse;
import com.github.dockerjava.api.model.Image;
import com.github.dockerjava.api.model.SearchItem;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.javadockerapibroker.services.impl.ImageServiceImpl;

import java.util.List;

@Api(value = "docker images management")
@RequiredArgsConstructor
@RequestMapping("/images")
@RestController
public class ImageController {

    private final ImageServiceImpl imageService;

    @ApiOperation(value = "Find one image.")
    @GetMapping("/{id}")
    public ResponseEntity<Image> findOne(@PathVariable String id) {
        Image image = imageService.findOneImage(id);
        HttpStatus status = image == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(image);
    }

    @ApiOperation(value = "Find all images.", response = List.class)
    @GetMapping
    public List<Image> findAll(@RequestParam(name = "showAll", required = false, defaultValue = "false") Boolean showAll, @RequestParam(name = "dangling", required = false, defaultValue = "false") Boolean dangling) {
        return imageService.findAllImages(showAll, dangling);
    }

    @ApiOperation(value = "Search for image in registry.", response = List.class)
    @GetMapping(value = "/search/{name}")
    public List<SearchItem> search(@PathVariable String name) {
        return imageService.searchImages(name);
    }

    @PostMapping("/build")
    public ResponseEntity<String> build() {
        return null;
    }

    @ApiOperation(value = "Create image.")
    @PostMapping("/create")
    public ResponseEntity<CreateImageResponse> create() {
        CreateImageResponse response = imageService.createImage();
        HttpStatus status = response == null ? HttpStatus.BAD_REQUEST : HttpStatus.CREATED;
        return ResponseEntity
                .status(status)
                .body(response);
    }

    @ApiOperation(value = "Remove image.")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable String id) {
        imageService.removeImage(id);
        return ResponseEntity.ok().build();
    }
}
