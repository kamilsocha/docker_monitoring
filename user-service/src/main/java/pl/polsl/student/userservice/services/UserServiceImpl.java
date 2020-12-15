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
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User findByEmail(String email) {
        log.warn("Processing request... Find by user email: " + email + "... Port: " + port);
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }

    @Override
    public User createUser(UserPostDto userPostDto) {
        log.warn("Processing request... Create user... Port: " + port);

        User user = objectMapper.convertValue(userPostDto, User.class);
        user.setRole(UserRole.ROLE_USER);

        return userRepository.save(user);
    }
}
