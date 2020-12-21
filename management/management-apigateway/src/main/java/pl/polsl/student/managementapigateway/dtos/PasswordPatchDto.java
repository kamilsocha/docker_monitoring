package pl.polsl.student.managementapigateway.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.polsl.student.managementapigateway.validation.EqualPasswordConstraint;

import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualPasswordConstraint
public class PasswordPatchDto {

    @Size(min = 4, message = "At least 4 characters.")
    private String password;

    private String confirmPassword;
}
