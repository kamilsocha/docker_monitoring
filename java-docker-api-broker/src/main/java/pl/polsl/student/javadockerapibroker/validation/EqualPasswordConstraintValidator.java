package pl.polsl.student.javadockerapibroker.validation;

import pl.polsl.student.javadockerapibroker.dto.UserPostDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EqualPasswordConstraintValidator
        implements ConstraintValidator<EqualPasswordConstraint, UserPostDto> {

   public void initialize(EqualPasswordConstraint constraint) {
   }

   @Override
   public boolean isValid(UserPostDto obj, ConstraintValidatorContext context) {
      return obj.getPassword().equals(obj.getConfirmPassword());
   }

}
