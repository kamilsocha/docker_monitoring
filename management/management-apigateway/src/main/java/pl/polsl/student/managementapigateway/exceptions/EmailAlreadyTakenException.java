package pl.polsl.student.managementapigateway.exceptions;

public class EmailAlreadyTakenException extends RuntimeException {
    public EmailAlreadyTakenException(String msg) {
        super(msg);
    }
}
