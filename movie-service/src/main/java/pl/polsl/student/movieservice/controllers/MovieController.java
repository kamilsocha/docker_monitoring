package pl.polsl.student.movieservice.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.polsl.student.movieservice.domain.Movie;
import pl.polsl.student.movieservice.exception.PageNotFoundException;
import pl.polsl.student.movieservice.services.impl.MovieServiceImpl;
import pl.polsl.student.movieservice.services.impl.PosterStorageServiceImpl;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;

//@CrossOrigin("*")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/movies")
@RestController
public class MovieController {

    private final MovieServiceImpl movieService;

    private final PosterStorageServiceImpl posterStorageService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @ApiOperation(value = "Find all movies.")
    @GetMapping("/all")
    public Page<Movie> findAll(@RequestParam(name = "unpaged", required = false) boolean unpaged, @PageableDefault(sort = "id")Pageable pageable) {

        Page<Movie> result;
        if(unpaged) {
            result = movieService.findAll(Pageable.unpaged());
        } else {
            result = movieService.findAll(pageable);
            if(result.getTotalPages() != 0 && pageable.getPageNumber() + 1 > result.getTotalPages()) {
                throw new PageNotFoundException("Page number: " + pageable.getPageNumber() + " was not found.");
            }
        }

        return result;
    }

    @ApiOperation(value = "Find movies without specified by ids.")
    @GetMapping
    public List<Movie> findAllButSpecified(@RequestParam Long[] idsToFilterOut) {
        return idsToFilterOut.length != 0 ? movieService.findAllButSpecified(idsToFilterOut) : movieService.findAll(Pageable.unpaged()).stream().collect(Collectors.toList());
    }

    @ApiOperation(value = "Retrieve details of specific movie.")
    @GetMapping("/{id}")
    public ResponseEntity<Movie> findById(@PathVariable Long id) {

        Movie movie = movieService.findById(id);
        final HttpStatus status = movie == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(movie);
    }

    @ApiOperation(value = "Save movie.")
    @PostMapping
    public ResponseEntity<Movie> create(@RequestParam String movieJson, @RequestParam MultipartFile file) throws IOException {

        String filename = posterStorageService.store(file);
        String fileDownloadUri = ServletUriComponentsBuilder
//                .fromCurrentContextPath()
                .fromPath("")
                .path("/movies/posters/")
                .path(filename).toUriString();

        Movie movie = objectMapper.readValue(movieJson, Movie.class);
        movie.setPosterUri(fileDownloadUri);

        Movie entity = movieService.createOneMovie(movie);
        final HttpStatus status = entity == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.CREATED;
        return  ResponseEntity
                .status(status)
                .body(entity);
    }

    @ApiOperation(value = "Download resource.")
    @GetMapping("/posters/{filename}")
    public ResponseEntity<Resource> downloadPoster(@PathVariable String filename, HttpServletRequest request) {
        Resource resource = posterStorageService.loadAsResource(filename);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename=\"%s\"", resource.getFilename()))
                .body(resource);
    }

    @ApiOperation(value = "Delete movie.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        movieService.delete(id);
        return ResponseEntity.ok().build();
    }
}
