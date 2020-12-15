package pl.polsl.student.ratingservice.exceptions;

public class RatingNotFoundException extends RuntimeException {

    public RatingNotFoundException(String message) {
        super(message);
    }
}
