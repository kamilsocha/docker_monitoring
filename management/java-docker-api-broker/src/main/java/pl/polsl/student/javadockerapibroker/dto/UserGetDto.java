package pl.polsl.student.javadockerapibroker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGetDto {

    private String email;

//    private String firstName;

//    private String lastName;

    private Boolean isActive;

    private String role;
}
