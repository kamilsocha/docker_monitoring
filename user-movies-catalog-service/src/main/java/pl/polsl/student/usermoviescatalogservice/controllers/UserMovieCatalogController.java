package pl.polsl.student.usermoviescatalogservice.controllers;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.student.usermoviescatalogservice.domain.UserMovieCatalogItem;
import pl.polsl.student.usermoviescatalogservice.services.UserMovieCatalogServiceImpl;

import java.util.LinkedHashSet;

@RequiredArgsConstructor
@RequestMapping("/catalog")
@RestController
public class UserMovieCatalogController {

    private final UserMovieCatalogServiceImpl userMovieCatalogService;

    @ApiOperation(value = "Get all movie catalogs")
//    @HystrixCommand
    @GetMapping
    public LinkedHashSet<UserMovieCatalogItem> findAll() {
        return userMovieCatalogService.findAll();
    }

    @ApiOperation(value = "Get movies rated by user with details and rating.")
//    @HystrixCommand
    @GetMapping("/{userId}")
    public LinkedHashSet<UserMovieCatalogItem> findByUserId(@PathVariable Long userId) {
        return userMovieCatalogService.findByUserId(userId);
    }

}
