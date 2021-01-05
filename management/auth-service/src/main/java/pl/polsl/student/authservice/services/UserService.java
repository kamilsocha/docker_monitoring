package pl.polsl.student.authservice.services;

import pl.polsl.student.authservice.domain.User;
import pl.polsl.student.authservice.dtos.PasswordPatchDto;
import pl.polsl.student.authservice.dtos.UserGetDto;
import pl.polsl.student.authservice.dtos.UserPostDto;

import java.util.List;

public interface UserService {

    List<User> findAllUsers();
    User findUser(Long id);
    UserGetDto findCurrentUser();
    User addUser(User user);
    User createUser(UserPostDto dto);
    User modifyPassword(Long id, PasswordPatchDto dto);
    void deleteUser(Long id);
}
