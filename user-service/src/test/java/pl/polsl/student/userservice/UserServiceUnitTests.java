package pl.polsl.student.userservice;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import pl.polsl.student.userservice.domain.User;
import pl.polsl.student.userservice.domain.UserRole;
import pl.polsl.student.userservice.exceptions.UserNotFoundException;
import pl.polsl.student.userservice.exceptions.UsernameNotFoundException;
import pl.polsl.student.userservice.repositories.UserRepository;
import pl.polsl.student.userservice.services.UserServiceImpl;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class UserServiceUnitTests {

    private String testUserEmail = "test@test.com";

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    public void shouldThrowWhenUserNotFoundByIdTest() {
        var id = 1L;
        given(userRepository.findById(any())).willReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> {
            userService.findById(id);
        });
    }

    @Test
    public void shouldThrowWhenUserNotFoundByEmailTest() {
        var email = "email@email.com";
        given(userRepository.findByEmail(any())).willReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class, () -> {
            userService.findByEmail(email);
        });
    }

    @Test
    public void shouldFindTestUserWhenAlreadyExistsTest() {
        var testUser = new User();
        testUser.setId(1L);
        testUser.setEmail(testUserEmail);
        testUser.setFirstName("firstname");
        testUser.setLastName("lastname");
        testUser.setRole(UserRole.ROLE_USER);
        given(userRepository.findByEmail(any())).willReturn(Optional.of(testUser));
        var res = userService.findTestUser();
        assertEquals(res.getId(), testUser.getId());
        assertEquals(res.getEmail(), testUser.getEmail());
        assertEquals(res.getFirstName(), testUser.getFirstName());
        assertEquals(res.getLastName(), testUser.getLastName());
        assertEquals(res.getRole(), testUser.getRole());
    }

    @Test
    public void shouldFindTestUserWhenDoesNotExist() {
        ReflectionTestUtils.setField(userService, "testUserEmail", testUserEmail);
        var testUser = new User();
        testUser.setEmail(testUserEmail);
        testUser.setFirstName("firstname");
        testUser.setLastName("lastname");
        testUser.setRole(UserRole.ROLE_USER);
        given(userRepository.findByEmail(any())).willReturn(Optional.empty());
        given(userRepository.save(any(User.class))).willAnswer(invocation -> invocation.getArgument(0));
        var res = userService.findTestUser();
        assertEquals(res.getEmail(), testUser.getEmail());
        assertEquals(res.getFirstName(), testUser.getFirstName());
        assertEquals(res.getLastName(), testUser.getLastName());
        assertEquals(res.getRole(), testUser.getRole());
    }
}
