package pl.polsl.student.managementapigateway.services.bootstrapservices;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.student.managementapigateway.domain.Role;
import pl.polsl.student.managementapigateway.domain.User;
import pl.polsl.student.managementapigateway.enums.BootstrapLabel;
import pl.polsl.student.managementapigateway.exceptions.EmailAlreadyTakenException;
import pl.polsl.student.managementapigateway.repositories.RoleRepository;
import pl.polsl.student.managementapigateway.services.UserService;

import java.util.Arrays;

@Slf4j
@Profile("development")
@RequiredArgsConstructor
@Service
public class DevelopmentBootStrapService extends BootStrapService {

    private final BCryptPasswordEncoder passwordEncoder;

    private final UserService userService;

    private final RoleRepository roleRepository;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

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
        userAdmin.setEmail(adminEmail);
        userAdmin.setIsActive(true);
        userAdmin.setPassword(passwordEncoder.encode(adminPassword));
//        LinkedHashSet<Role> authoritiesAdmin = new LinkedHashSet<>();
//        authoritiesAdmin.add(roleRepository.findFirstByName("ROLE_ADMIN"));
//        userAdmin.setRoles(authoritiesAdmin);
        userAdmin.setRole(roleRepository.findFirstByName("ROLE_ADMIN"));

//        User user = new User();
//        user.setEmail("user@user.com");
//        user.setIsActive(true);
//        user.setPassword(passwordEncoder.encode("user"));
//        LinkedHashSet<Role> authoritiesUser = new LinkedHashSet<>();
//        authoritiesUser.add(roleRepository.findFirstByName("ROLE_USER"));
//        user.setRoles(authoritiesUser);
        try {
            userService.addUser(userAdmin);
//            userService.addUser(user);
            log.info("Users created.");
        } catch (EmailAlreadyTakenException e) {
            log.info("User with specified e-mail already present. Skipping...");
        }
    }

}
