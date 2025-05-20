package ar.edu.utn.frc.tup.lc.iii.dtos.error;

public class InvalidOrderStateException extends RuntimeException {
    public InvalidOrderStateException(String message) {
        super(message);
    }
}
