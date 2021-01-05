package pl.polsl.student.authservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController {

    @GetMapping("/verify")
    public ResponseEntity<?> verifyAuthentication() {
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/verifyAdmin")
    public ResponseEntity<?> verifyAdminAuthentication() {
        return ResponseEntity.ok().build();
    }
}
