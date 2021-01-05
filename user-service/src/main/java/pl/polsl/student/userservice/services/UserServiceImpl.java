package pl.polsl.student.userservice.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.polsl.student.userservice.domain.User;
import pl.polsl.student.userservice.domain.UserPostDto;
import pl.polsl.student.userservice.domain.UserRole;
import pl.polsl.student.userservice.exceptions.UserNotFoundException;
import pl.polsl.student.userservice.exceptions.UsernameNotFoundException;
import pl.polsl.student.userservice.repositories.UserRepository;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    @Value("${server.port}")
    private Integer port;

    @Value("${testuser.email}")
    private String testUserEmail;

    private final UserRepository userRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public LinkedHashSet<User> findAll() {
        log.warn("Processing request: find all... Port: " + port);
        return new LinkedHashSet<>(userRepository.findAll());
    }

    @Override
    public User findById(Long id) {
        log.warn("Processing request... Find by user id: " + id + "... Port: " + port);
        return userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException(id)
        );
    }

    @Override
    public User findTestUser() {
        Optional<User> testUser = userRepository.findByEmail(testUserEmail);
        if(testUser.isPresent()) {
            return testUser.get();
        }
        User newUser = new User();
        newUser.setEmail(testUserEmail);
        newUser.setFirstName("firstname");
        newUser.setLastName("lastname");
        newUser.setRole(UserRole.ROLE_USER);
        return userRepository.save(newUser);
    }

    @Override
    public User findByEmail(String email) {
        log.warn("Processing request... Find by user email: " + email + "... Port: " + port);
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElseThrow(
                () -> new UsernameNotFoundException(email)
        );
    }

    @Override
    public User createUser(UserPostDto userPostDto) {
        log.warn("Processing request... Create user... Port: " + port);

        User user = objectMapper.convertValue(userPostDto, User.class);
        user.setRole(UserRole.ROLE_USER);

        return userRepository.save(user);
    }
}
