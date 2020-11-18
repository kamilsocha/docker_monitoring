package pl.polsl.student.javadockerapibroker.services.bootstrapservices;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.student.javadockerapibroker.domain.Role;
import pl.polsl.student.javadockerapibroker.domain.User;
import pl.polsl.student.javadockerapibroker.enums.BootstrapLabel;
import pl.polsl.student.javadockerapibroker.exceptions.EmailAlreadyTakenException;
import pl.polsl.student.javadockerapibroker.repositories.RoleRepository;
import pl.polsl.student.javadockerapibroker.services.UserService;

import java.util.Arrays;
import java.util.LinkedHashSet;

@Slf4j
@Profile("development")
@RequiredArgsConstructor
@Service
public class DevelopmentBootStrapService extends BootStrapService {

    private final BCryptPasswordEncoder passwordEncoder;

    private final UserService userService;

    private final RoleRepository roleRepository;

    @Override
    protected void writeDefaults() {
        super.writeDefaults();
        entryService.createIfNotExists(BootstrapLabel.CREATE_DEVELOP_AUTHORITIES, this::createDevelopAuthorities);
        entryService.createIfNotExists(BootstrapLabel.CREATE_DEVELOP_USERS, this::createDevelopUsers);
    }

    private void createDevelopAuthorities() {
        log.info("Creating development users authorities...");
        Role roleAdmin = new Role();
        roleAdmin.setName("ROLE_ADMIN");
        Role roleUser = new Role();
        roleUser.setName("ROLE_USER");
        roleRepository.saveAll(Arrays.asList(roleAdmin, roleUser));
        log.info("Authorities created.");
    }

    private void createDevelopUsers() {
        log.info("Creating default development user accounts...");
        User userAdmin = new User();
        userAdmin.setEmail("admin@admin.com");
        userAdmin.setFirstName("admin");
        userAdmin.setLastName("admin");
        userAdmin.setIsActive(true);
        userAdmin.setPassword(passwordEncoder.encode("admin"));
        LinkedHashSet<Role> authoritiesAdmin = new LinkedHashSet<>();
        authoritiesAdmin.add(roleRepository.findFirstByName("ROLE_ADMIN"));
        userAdmin.setRoles(authoritiesAdmin);
        User user = new User();
        user.setEmail("user@user.com");
        user.setFirstName("user");
        user.setLastName("user");
        user.setIsActive(true);
        user.setPassword(passwordEncoder.encode("user"));
        LinkedHashSet<Role> authoritiesUser = new LinkedHashSet<>();
        authoritiesUser.add(roleRepository.findFirstByName("ROLE_USER"));
        user.setRoles(authoritiesUser);
        try {
            userService.addUser(userAdmin);
            userService.addUser(user);
            log.info("Users created.");
        } catch (EmailAlreadyTakenException e) {
            log.info("User with specified e-mail already present. Skipping...");
        }
    }

}
