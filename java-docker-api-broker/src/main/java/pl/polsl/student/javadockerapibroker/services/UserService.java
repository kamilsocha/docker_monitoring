package pl.polsl.student.javadockerapibroker.services;

import pl.polsl.student.javadockerapibroker.domain.User;
import pl.polsl.student.javadockerapibroker.dto.UserPostDto;

import java.util.LinkedHashSet;

public interface UserService {

    LinkedHashSet<User> findAllUsers();
    User findUser(Long id);
    User addUser(User user);
    User createUser(UserPostDto dto);
}
