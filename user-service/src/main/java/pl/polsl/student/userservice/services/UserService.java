package pl.polsl.student.userservice.services;

import pl.polsl.student.userservice.domain.User;

import java.util.LinkedHashSet;

public interface UserService {

    LinkedHashSet<User> findAll();
    User findById(Long id);
    User createUser(User rating);
}
