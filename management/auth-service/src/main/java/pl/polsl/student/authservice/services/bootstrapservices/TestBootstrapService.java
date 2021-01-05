package pl.polsl.student.authservice.services.bootstrapservices;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.student.authservice.domain.Role;
import pl.polsl.student.authservice.domain.User;
import pl.polsl.student.authservice.enums.BootstrapLabel;
import pl.polsl.student.authservice.exceptions.EmailAlreadyTakenException;
import pl.polsl.student.authservice.repositories.RoleRepository;
import pl.polsl.student.authservice.services.UserService;

import java.util.Arrays;

@Slf4j
@Profile("test")
@RequiredArgsConstructor
@Service
public class TestBootstrapService extends BootStrapService {

    private final BCryptPasswordEncoder passwordEncoder;

    private final UserService userService;

    private final RoleRepository roleRepository;

    @Override
    protected void writeDefaults() {
        super.writeDefaults();
        entryService.createIfNotExists(BootstrapLabel.CREATE_TEST_AUTHORITIES, this::createTestAuthorities);
        entryService.createIfNotExists(BootstrapLabel.CREATE_TEST_USERS, this::createTestUsers);
    }

    private void createTestAuthorities() {
        log.info("Creating test users authorities...");
        Role roleAdmin = new Role();
        roleAdmin.setName("ROLE_ADMIN");
        Role roleUser = new Role();
        roleUser.setName("ROLE_USER");
        roleRepository.saveAll(Arrays.asList(roleAdmin, roleUser));
        log.info("Authorities created.");
    }

    private void createTestUsers() {
        log.info("Creating default test user accounts...");
        User userTest = new User();
        userTest.setEmail("testUser");
        userTest.setIsActive(true);
        userTest.setPassword(passwordEncoder.encode("test"));
        userTest.setRole(roleRepository.findFirstByName("ROLE_USER"));

        try {
            userService.addUser(userTest);
            log.info("Users created.");
        } catch (EmailAlreadyTakenException e) {
            log.info("User with specified e-mail already present. Skipping...");
        }
    }
}
