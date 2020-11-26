package pl.polsl.student.javadockerapibroker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.polsl.student.javadockerapibroker.validation.EqualPasswordConstraint;

import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualPasswordConstraint
public class UserPostDto {

    @Email
    private String email;

    private String password;

    private String confirmPassword;
}
