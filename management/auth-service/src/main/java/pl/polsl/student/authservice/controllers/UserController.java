package pl.polsl.student.authservice.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.authservice.domain.User;
import pl.polsl.student.authservice.dtos.PasswordPatchDto;
import pl.polsl.student.authservice.dtos.UserGetDto;
import pl.polsl.student.authservice.dtos.UserPostDto;
import pl.polsl.student.authservice.services.impl.UserServiceImpl;

import javax.validation.Valid;
import java.util.List;

@Api(value = "users management")
@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {

    private final UserServiceImpl userService;

    @ApiOperation(value = "Find all users.")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public List<User> findAll() {
        return userService.findAllUsers();
    }

    @ApiOperation(value = "Get current user.")
    @GetMapping("/current")
    public UserGetDto findCurrent() {
        return userService.findCurrentUser();
    }

    @ApiOperation(value = "Find one user.")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/{id}")
    public ResponseEntity<User> findOne(@PathVariable Long id) {
        User user = userService.findUser(id);
        final HttpStatus status = user == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(user);
    }

    @ApiOperation("Create user.")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<User> create(@Valid @RequestBody UserPostDto dto) {
        User user = userService.createUser(dto);
        final HttpStatus status = user == null ? HttpStatus.BAD_REQUEST : HttpStatus.CREATED;
        return ResponseEntity
                .status(status)
                .body(user);
    }

    @ApiOperation(value = "Modify user password.")
    @PatchMapping("/{id}")
    public ResponseEntity<User> modify(@PathVariable Long id, @Valid @RequestBody PasswordPatchDto passwordPatchDto) {
        User user = userService.modifyPassword(id, passwordPatchDto);
        HttpStatus status = user == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK;
        return ResponseEntity
                .status(status)
                .body(user);
    }

    @ApiOperation(value = "Delete one user.")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
