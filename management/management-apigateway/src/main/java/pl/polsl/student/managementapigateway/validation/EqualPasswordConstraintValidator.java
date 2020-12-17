package pl.polsl.student.managementapigateway.validation;

import pl.polsl.student.managementapigateway.dtos.PasswordPatchDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EqualPasswordConstraintValidator
        implements ConstraintValidator<EqualPasswordConstraint, PasswordPatchDto> {

   public void initialize(EqualPasswordConstraint constraint) {
   }

   @Override
   public boolean isValid(PasswordPatchDto obj, ConstraintValidatorContext context) {
      return obj.getPassword().equals(obj.getConfirmPassword());
   }

}
