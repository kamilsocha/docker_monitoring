package pl.polsl.student.userservice.services;

import pl.polsl.student.userservice.domain.User;
import pl.polsl.student.userservice.domain.UserPostDto;

import java.util.LinkedHashSet;

public interface UserService {

    LinkedHashSet<User> findAll();
    User findById(Long id);
    User findTestUser();
    User findByEmail(String email);
    User createUser(UserPostDto userPostDto);
}
