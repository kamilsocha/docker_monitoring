package pl.polsl.student.javadockerapibroker.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.student.javadockerapibroker.domain.User;
import pl.polsl.student.javadockerapibroker.dto.UserPostDto;
import pl.polsl.student.javadockerapibroker.repositories.UserRepository;
import pl.polsl.student.javadockerapibroker.services.UserService;

import java.util.LinkedHashSet;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public LinkedHashSet<User> findAllUsers() {
        return new LinkedHashSet<>(userRepository.findAll());
    }

    public User findUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User createUser(UserPostDto dto) {

        return userRepository.save(convertToEntity(dto));
    }

    private User convertToEntity(UserPostDto dto) {
        User entity = new User();
        entity.setEmail(dto.getEmail());
        entity.setPassword(passwordEncoder.encode(dto.getPassword()));
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setIsActive(true);
        //
        return entity;
    }
}
