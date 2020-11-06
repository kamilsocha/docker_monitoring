package pl.polsl.student.converterservice.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FieldErrorDesc {

    private String name;
    private Object value;
    private String error;
}
