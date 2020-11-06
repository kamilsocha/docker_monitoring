package pl.polsl.student.converterservice.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class RomanValidator implements ConstraintValidator<ValidRoman, String> {

   private final String regex = "^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$";

   public boolean isValid(String roman, ConstraintValidatorContext context) {
      return roman.matches(regex);
   }
}
