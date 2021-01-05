package pl.polsl.student.userservice.exceptions;

public class UsernameNotFoundException extends RuntimeException {

    public UsernameNotFoundException(String username) {

        super("Could not find user with username: " + username);
    }
}
