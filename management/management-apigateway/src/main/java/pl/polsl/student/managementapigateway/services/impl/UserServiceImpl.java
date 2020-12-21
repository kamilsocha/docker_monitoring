package pl.polsl.student.managementapigateway.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.student.managementapigateway.domain.Role;
import pl.polsl.student.managementapigateway.domain.User;
import pl.polsl.student.managementapigateway.dtos.PasswordPatchDto;
import pl.polsl.student.managementapigateway.dtos.UserPostDto;
import pl.polsl.student.managementapigateway.exceptions.NotFoundException;
import pl.polsl.student.managementapigateway.repositories.RoleRepository;
import pl.polsl.student.managementapigateway.repositories.UserRepository;
import pl.polsl.student.managementapigateway.services.UserService;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User createUser(UserPostDto dto) {
        return userRepository.save(convertToEntity(dto));
    }

    @Override
    public User modifyPassword(Long id, PasswordPatchDto dto) {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User with id: " + id + " was not found."));
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        return userRepository.save(user);
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
        return entity;
    }
}
