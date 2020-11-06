package pl.polsl.student.converterservice.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidationErrorDesc  {

    private String message;
    private HttpStatus status;

    private List<ObjectErrorDesc> objectErrors = new ArrayList<>();
    private List<FieldErrorDesc> fieldErrors = new ArrayList<>();

    public ValidationErrorDesc(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }
}
