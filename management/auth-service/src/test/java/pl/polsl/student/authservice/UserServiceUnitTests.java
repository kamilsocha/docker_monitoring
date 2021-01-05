package pl.polsl.student.authservice;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import pl.polsl.student.authservice.domain.Role;
import pl.polsl.student.authservice.domain.User;
import pl.polsl.student.authservice.dtos.PasswordPatchDto;
import pl.polsl.student.authservice.dtos.UserGetDto;
import pl.polsl.student.authservice.dtos.UserPostDto;
import pl.polsl.student.authservice.exceptions.EmailAlreadyTakenException;
import pl.polsl.student.authservice.repositories.RoleRepository;
import pl.polsl.student.authservice.repositories.UserRepository;
import pl.polsl.student.authservice.services.impl.UserServiceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class UserServiceUnitTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;


    @Test
    public void shouldCreateUser() {
        var userPost = new UserPostDto();
        userPost.setEmail("email");
        userPost.setPassword("password");

        var roleUser = new Role();
        roleUser.setId(1L);
        roleUser.setName("ROLE_USER");

        given(userRepository.existsByEmail(userPost.getEmail())).willReturn(false);
        given(roleRepository.findFirstByName("ROLE_USER")).willReturn(roleUser);
        given(userRepository.save(any(User.class))).willAnswer(invocation -> invocation.getArgument(0));
        var expected = new UserGetDto();
        expected.setEmail(userPost.getEmail());
        expected.setRole(roleRepository.findFirstByName("ROLE_USER").getName());

        var res = userService.createUser(userPost);

        assertEquals(expected.getEmail(), res.getEmail());
        assertEquals(expected.getRole(), res.getRole().getName());
    }

    @Test
    public void shouldThrowWhenEmailAlreadyExists() {
        var userPost = new UserPostDto();
        userPost.setEmail("email");
        userPost.setPassword("password");
        given(userRepository.existsByEmail(userPost.getEmail())).willReturn(true);
        assertThrows(EmailAlreadyTakenException.class, () -> {
            userService.createUser(userPost);
        });
    }

    @Test
    public void shouldModifyPassword() {
        var passwordPatch = new PasswordPatchDto();
        passwordPatch.setPassword("newPass");
        passwordPatch.setConfirmPassword("newPass");
        var user = new User();
        user.setId(1L);
        user.setEmail("email@email.com");
        user.setPassword(passwordEncoder.encode("oldPass"));
        var expected = user;
        expected.setPassword(passwordEncoder.encode(passwordPatch.getPassword()));

        given(userRepository.findById(user.getId())).willReturn(java.util.Optional.of(user));
        given(userRepository.save(any(User.class))).willAnswer(invocation -> invocation.getArgument(0));

        var res = userService.modifyPassword(user.getId(), passwordPatch);

        assertEquals(expected.getPassword(), res.getPassword());
    }

    @Test
    public void shouldDeleteUser() {
        var inputId = 1L;
        var role = new Role();
        role.setName("ROLE_USER");
        var user = new User();
        user.setId(inputId);
        user.setRole(role);
        given(roleRepository.findFirstByName(any())).willReturn(new Role());
        given(userRepository.findById(inputId)).willReturn(java.util.Optional.of(user));

        userService.deleteUser(inputId);

        verify(userRepository).deleteById(inputId);
    }
}
