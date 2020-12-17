package pl.polsl.student.managementapigateway.services;


import pl.polsl.student.managementapigateway.domain.User;

import java.util.List;

public interface UserService {

    List<User> findAllUsers();
    User findUser(Long id);
    User addUser(User user);
}
