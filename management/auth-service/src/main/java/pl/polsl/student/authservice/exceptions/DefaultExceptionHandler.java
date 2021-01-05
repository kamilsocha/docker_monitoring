package pl.polsl.student.authservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class DefaultExceptionHandler {

    @ExceptionHandler(ElementNotFoundException.class)
    public ResponseEntity<?> handleElementNotFoundException(ElementNotFoundException e) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleDockerElementNotFoundException(NotFoundException e) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(e.getMessage());
    }

    @ExceptionHandler(value = EmailAlreadyTakenException.class)
    public ResponseEntity<?> handleEmailAlreadyTakenException(EmailAlreadyTakenException e) {
        return new ResponseEntity<>(
                "Email already taken.",
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<List<String>> handleValidationException(MethodArgumentNotValidException e) {
        List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        List<ObjectError> objectErrors = e.getBindingResult().getGlobalErrors();
        ArrayList<String> list = new ArrayList<>();
        for (FieldError fieldError : fieldErrors) {
            list.add("Field_name: " + fieldError.getField() +
                    " Value: " + fieldError.getRejectedValue() +
                    " Error_name: " + fieldError.getCode());
        }

        objectErrors.forEach(element -> {
            list.add("Object_error: " + element.getDefaultMessage());
        });

        return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST);
    }
}
