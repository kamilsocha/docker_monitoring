package pl.polsl.student.authservice.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.polsl.student.authservice.exceptions.NotFoundException;
import pl.polsl.student.authservice.repositories.UserRepository;

@RequiredArgsConstructor
@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository
                .findUserByEmail(email)
                .orElseThrow(() -> new NotFoundException("User with email: " + email + " not found."));
    }
}
