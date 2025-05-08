package ar.edu.utn.frc.tup.lc.iii.advice;

import ar.edu.utn.frc.tup.lc.iii.dtos.error.ApiError;
import ar.edu.utn.frc.tup.lc.iii.dtos.error.NotEnoughConsumablesException;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.MissingConsumableDto;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityExistsException.class)
    public ResponseEntity<ApiError> handleEntityExist(EntityExistsException exception,
                                                      HttpServletRequest request) {
        ApiError error = ApiError.of(HttpStatus.CONFLICT, exception.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiError> handleEntityNotFound(EntityNotFoundException exception,
                                                         HttpServletRequest request) {
        ApiError error = ApiError.of(HttpStatus.NOT_FOUND, exception.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(NotEnoughConsumablesException.class)
    public ResponseEntity<List<MissingConsumableDto>> handleNotEnoughConsumables(
            NotEnoughConsumablesException exception,
            HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(exception.getMissingConsumables());
    }
}
