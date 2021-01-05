package pl.polsl.student.authservice.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = EqualPasswordConstraintValidator.class)
public @interface EqualPasswordConstraint {

    String message() default "Passwords must match!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
