package pl.polsl.student.javadockerapibroker.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.javadockerapibroker.domain.User;
import pl.polsl.student.javadockerapibroker.dto.UserPostDto;
import pl.polsl.student.javadockerapibroker.services.impl.UserServiceImpl;

import javax.ws.rs.core.MediaType;
import java.util.LinkedHashSet;

@Api(value = "users management")
@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {

    private final UserServiceImpl userService;

    @ApiOperation(value = "Find all users.")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public LinkedHashSet<User> findAll() {
        return userService.findAllUsers();
    }

    @ApiOperation(value = "Find one user.")
    @GetMapping(value = "/{id}")
    public ResponseEntity<User> findOne(@PathVariable Long id) {
        User user = userService.findUser(id);
        final HttpStatus status = user == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(user);
    }

    @ApiOperation(value = "Create new user.")
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<User> create(@RequestBody UserPostDto userPostDto) {
        User user = userService.createUser(userPostDto);
        final HttpStatus status = user == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.CREATED;
        return ResponseEntity
                .status(status)
                .body(user);
    }

    @ApiOperation(value = "Modify user details.")
    @PatchMapping
    public ResponseEntity<User> modify(@RequestBody UserPostDto userPostDto) {
        return null;
    }

    @ApiOperation(value = "Delete one user.")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return null;
    }
}
