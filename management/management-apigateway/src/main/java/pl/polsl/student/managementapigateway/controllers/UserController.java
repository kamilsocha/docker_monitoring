package pl.polsl.student.managementapigateway.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.student.managementapigateway.domain.User;
import pl.polsl.student.managementapigateway.dtos.PasswordPatchDto;
import pl.polsl.student.managementapigateway.services.impl.UserServiceImpl;

import java.util.List;

@Api(value = "users management")
@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {

    private final UserServiceImpl userService;

    @ApiOperation(value = "Find all users.")
    @GetMapping
    public List<User> findAll() {
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

    @ApiOperation(value = "Modify user password.")
    @PatchMapping
    public ResponseEntity<User> modify(@RequestBody PasswordPatchDto passwordPatchDto) {
        return null;
    }

    @ApiOperation(value = "Delete one user.")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return null;
    }
}
