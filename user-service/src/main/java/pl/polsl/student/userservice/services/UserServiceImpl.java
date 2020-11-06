package pl.polsl.student.userservice.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.polsl.student.userservice.domain.User;
import pl.polsl.student.userservice.repositories.UserRepository;

import java.util.LinkedHashSet;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Value("${server.port}")
    private Integer port;

    private final UserRepository userRepository;

    @Override
    public LinkedHashSet<User> findAll() {
        logger.warn("Processing request: find all... Port: " + port);
        return userRepository.findAll()
                .stream()
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    @Override
    public User findById(Long id) {
        logger.warn("Processing request: find by user... Port: " + port);
//        return Arrays.asList(
//                new Rating((long) 1, (long) 1, (long) 1, 4.0),
//                new Rating((long) 2, (long) 2, (long) 1, 3.5),
//                new Rating((long) 3, (long) 4, (long) 1, 4.5)
//        );
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User createUser(User user) {
        logger.warn("Processing request: create rating... Port: " + port);
        return userRepository.save(user);
    }
}
