package pl.polsl.student.converterservice.exceptions;

public class WrongRomanNumberException extends RuntimeException {

    public WrongRomanNumberException(String message) {
        super("Invalid Roman Number. " + message);
    }
}
