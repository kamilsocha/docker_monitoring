package pl.polsl.student.userservice.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPostDto {

    private String email;
    private String firstName;
    private String lastName;
//    private String role;
}
