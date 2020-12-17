package pl.polsl.student.managementapigateway.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.student.managementapigateway.domain.Role;
import pl.polsl.student.managementapigateway.domain.User;
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

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }


//    private User convertToEntity(UserPostDto dto) {
//        User entity = new User();
//        entity.setEmail(dto.getEmail());
//        entity.setPassword(passwordEncoder.encode(dto.getPassword()));
//        entity.setIsActive(true);
//        var userRole = roleRepository.findFirstByName("ROLE_USER");
//        Set<Role> userRoles = new LinkedHashSet<>();
//        userRoles.add(userRole);
//        entity.setRoles(userRoles);
//        return entity;
//    }
}
