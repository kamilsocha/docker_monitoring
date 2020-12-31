package pl.polsl.student.userservice.controllers;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.userservice.domain.User;
import pl.polsl.student.userservice.domain.UserPostDto;
import pl.polsl.student.userservice.services.UserServiceImpl;

import java.util.LinkedHashSet;

@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {

    private final UserServiceImpl userService;

    @Value("${testuser.email}")
    private String testUserEmail;

    @ApiOperation(value = "Find all users")
    @GetMapping
    public LinkedHashSet<User> findAll() {
        return userService.findAll();
    }

    @ApiOperation(value = "Find user by id.")
    @GetMapping("/{id}")
    public ResponseEntity<User> findOne(@PathVariable Long id) {

        User user = userService.findById(id);
        HttpStatus status = user == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(user);
    }

    @ApiOperation(value = "Find user by email.")
    @GetMapping("/email/{email}")
    public ResponseEntity<User> findOneByEmail(@PathVariable String email) {

        if(email.equals(testUserEmail)) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(userService.findTestUser());
        }

        User user = userService.findByEmail(email);
        HttpStatus status = user == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(user);
    }

    @ApiOperation(value = "Create user.")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> create(@RequestBody UserPostDto userPostDto) {
        User entity = userService.createUser(userPostDto);
        final HttpStatus status = entity == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.CREATED;
        return  ResponseEntity
                .status(status)
                .body(entity);
    }
}
