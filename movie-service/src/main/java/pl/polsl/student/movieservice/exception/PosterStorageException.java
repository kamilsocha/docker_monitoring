package pl.polsl.student.movieservice.exception;

public class PosterStorageException extends RuntimeException {

    public PosterStorageException(String message) {
        super(message);
    }

    public PosterStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
