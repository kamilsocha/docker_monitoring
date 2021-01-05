package pl.polsl.student.authservice.exceptions;

public class EmailAlreadyTakenException extends RuntimeException {
    public EmailAlreadyTakenException(String msg) {
        super(msg);
    }
}
