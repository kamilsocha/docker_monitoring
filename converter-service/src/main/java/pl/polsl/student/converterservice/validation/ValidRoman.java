package pl.polsl.student.converterservice.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = RomanValidator.class)
@Target({ElementType.PARAMETER, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidRoman {

    String message() default "Invalid Decimal to convert";

    Class<?>[] groups() default  {};

    Class<? extends Payload>[] payload() default {};
}
