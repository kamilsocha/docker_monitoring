package pl.polsl.student.javadockerapibroker.exceptions;

public class ElementNotFoundException extends RuntimeException {

    public ElementNotFoundException(int id) {
        super("Could not find object with ID: " + id + ".");
    }
}
