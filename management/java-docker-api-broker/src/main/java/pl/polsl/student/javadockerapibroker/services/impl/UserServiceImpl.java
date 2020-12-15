package pl.polsl.student.javadockerapibroker.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.student.javadockerapibroker.domain.Role;
import pl.polsl.student.javadockerapibroker.domain.User;
import pl.polsl.student.javadockerapibroker.dto.UserPostDto;
import pl.polsl.student.javadockerapibroker.repositories.RoleRepository;
import pl.polsl.student.javadockerapibroker.repositories.UserRepository;
import pl.polsl.student.javadockerapibroker.services.UserService;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

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

//    @Transactional
    public User createUser(UserPostDto dto) {

        return userRepository.saveAndFlush(convertToEntity(dto));
    }

    private User convertToEntity(UserPostDto dto) {
        User entity = new User();
        entity.setEmail(dto.getEmail());
        entity.setPassword(passwordEncoder.encode(dto.getPassword()));
        entity.setIsActive(true);
        var userRole = roleRepository.findFirstByName("ROLE_USER");
        Set<Role> userRoles = new LinkedHashSet<>();
        userRoles.add(userRole);
        entity.setRoles(userRoles);
//        entity.setRoles(Collections.singleton(roleRepository.findFirstByName("ROLE_USER")));
        //
        return entity;
    }
}
