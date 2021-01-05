package pl.polsl.student.authservice;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import pl.polsl.student.authservice.controllers.UserController;
import pl.polsl.student.authservice.domain.User;
import pl.polsl.student.authservice.dtos.PasswordPatchDto;
import pl.polsl.student.authservice.dtos.UserPostDto;
import pl.polsl.student.authservice.repositories.RoleRepository;
import pl.polsl.student.authservice.services.impl.UserServiceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@TestPropertySource(locations = {"/application-test.yml"})
@SpringBootTest
public class UserControllerIntegrationTests {

    @Autowired
    private UserController userController;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserServiceImpl userService;

    private long createUser() {
        var user = new User();
        user.setEmail("test1@test.com");
        user.setPassword("test");
        user.setRole(roleRepository.findFirstByName("ROLE_USER"));
        return userService.addUser(user).getId();
    }

    private void cleanCreatedUser(long id) {
        userService.deleteUser(id);
    }

    @Test
    public void shouldCreateUserThenGetExpectedUser() {
        var userPost = new UserPostDto();
        userPost.setEmail("test2@test.com");
        userPost.setPassword("test");
        var expectedUser = new User();
        expectedUser.setEmail(userPost.getEmail());
        expectedUser.setRole(roleRepository.findFirstByName("ROLE_USER"));

        var id = userController.create(userPost).getBody().getId();
        var res = userController.findOne(id);
        var user = res.getBody();

        assertEquals(res.getStatusCode(), HttpStatus.OK);
        assertEquals(expectedUser.getEmail(), user.getEmail());
        assertEquals(expectedUser.getRole(), user.getRole());
    }

    @Test
    public void shouldModifyUserPassword() {
        var id = createUser();
        var passwordPatch = new PasswordPatchDto();
        passwordPatch.setPassword("newPass");
        passwordPatch.setConfirmPassword("newPass");

        var res = userController.modify((long) id, passwordPatch);
        cleanCreatedUser(id);
        assertEquals(HttpStatus.OK, res.getStatusCode());
    }

    @Test
    public void shouldDeleteUser() {
        var id = createUser();
        var res = userController.delete(id);
        assertEquals(HttpStatus.OK, res.getStatusCode());
    }
}
