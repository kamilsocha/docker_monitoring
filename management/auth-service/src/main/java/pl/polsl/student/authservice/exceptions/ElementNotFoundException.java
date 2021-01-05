package pl.polsl.student.authservice.exceptions;

public class ElementNotFoundException extends RuntimeException {

    public ElementNotFoundException(int id) {
        super("Could not find object with ID: " + id + ".");
    }
}
