package pl.polsl.student.javadockerapibroker.exceptions;

public class EmailAlreadyTakenException extends RuntimeException {
    public EmailAlreadyTakenException(String msg) {
        super(msg);
    }
}
