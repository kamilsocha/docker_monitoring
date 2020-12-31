package pl.polsl.student.managementapigateway.services;


import pl.polsl.student.managementapigateway.domain.User;
import pl.polsl.student.managementapigateway.dtos.PasswordPatchDto;
import pl.polsl.student.managementapigateway.dtos.UserGetDto;
import pl.polsl.student.managementapigateway.dtos.UserPostDto;

import java.util.List;

public interface UserService {

    List<User> findAllUsers();
    User findUser(Long id);
    UserGetDto findCurrentUser();
    void addUser(User user);
    User createUser(UserPostDto dto);
    User modifyPassword(Long id, PasswordPatchDto dto);
    void deleteUser(Long id);
}
