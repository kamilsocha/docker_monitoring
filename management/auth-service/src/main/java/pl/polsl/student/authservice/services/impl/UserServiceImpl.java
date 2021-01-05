package pl.polsl.student.authservice.services.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.student.authservice.domain.User;
import pl.polsl.student.authservice.dtos.PasswordPatchDto;
import pl.polsl.student.authservice.dtos.UserGetDto;
import pl.polsl.student.authservice.dtos.UserPostDto;
import pl.polsl.student.authservice.exceptions.EmailAlreadyTakenException;
import pl.polsl.student.authservice.exceptions.NotFoundException;
import pl.polsl.student.authservice.repositories.RoleRepository;
import pl.polsl.student.authservice.repositories.UserRepository;
import pl.polsl.student.authservice.services.UserService;

import java.util.List;

@Slf4j
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

        return userRepository.findById(id).orElseThrow(
                () -> new NotFoundException("User with id: " + id + " was not found")
        );
    }

    @Override
    public UserGetDto findCurrentUser() {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return convertToGetDto(user);
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User createUser(UserPostDto dto) {

        if(!userRepository.existsByEmail(dto.getEmail())) {
            return userRepository.save(convertToEntity(dto));
        } else {
            throw new EmailAlreadyTakenException("Email: " + dto.getEmail() + " is already taken.");
        }

    }

    @Override
    public User modifyPassword(Long id, PasswordPatchDto dto) {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User with id: " + id + " was not found."));
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {

        var user = userRepository.findById(id);
        if(user.isPresent() && !user.get().getRole().getName().equals(roleRepository.findFirstByName("ROLE_ADMIN").getName())) {
            log.debug("deleting user..." + id);
            userRepository.deleteById(id);
        } else {
            log.debug("failed to delete user..." + id);
            throw new NotFoundException("Can't delete user with id: " + id + ".");
        }
    }


    private User convertToEntity(UserPostDto dto) {
        User entity = new User();
        entity.setEmail(dto.getEmail());
        entity.setPassword(passwordEncoder.encode(dto.getPassword()));
        entity.setIsActive(true);
        entity.setRole(roleRepository.findFirstByName("ROLE_USER"));
        return entity;
    }

    private UserGetDto convertToGetDto(User entity) {
        UserGetDto dto = new UserGetDto();
        dto.setEmail(entity.getEmail());
        dto.setRole(entity.getRole().getName());
        return dto;
    }

}
