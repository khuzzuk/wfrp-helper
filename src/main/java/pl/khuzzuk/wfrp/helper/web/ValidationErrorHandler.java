package pl.khuzzuk.wfrp.helper.web;

import lombok.AllArgsConstructor;
import org.springframework.core.NestedRuntimeException;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import pl.khuzzuk.wfrp.helper.common.date.CurrentDateTimeService;

import javax.annotation.Nullable;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@ControllerAdvice
class ValidationErrorHandler extends ResponseEntityExceptionHandler {
    private final CurrentDateTimeService currentDateTimeService;

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(@Nullable MethodArgumentNotValidException ex,
                                                                  @Nullable HttpHeaders headers,
                                                                  @Nullable HttpStatus status,
                                                                  @Nullable WebRequest request) {
        ApiError apiError = createApiError();

        if (ex != null) {
            List<ValidationError> validationErrors = ex.getBindingResult().getFieldErrors().stream()
                    .map(ValidationErrorHandler::getValidationError)
                    .collect(Collectors.toList());
            validationErrors.forEach(validationError -> validationError.setEntity(ex.getBindingResult().getTarget()));
            apiError.setErrors(validationErrors);
        }

        return new ResponseEntity<>(apiError, headers, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({DataAccessException.class, TransactionSystemException.class})
    public ResponseEntity<Object> handleDataAccessException(NestedRuntimeException exception) {
        ApiError apiError = createApiError();


        if (exception.getMostSpecificCause() instanceof ConstraintViolationException) {
            ConstraintViolationException constraintViolationException = (ConstraintViolationException) exception.getMostSpecificCause();
            List<ValidationError> validationErrors = new ArrayList<>();

            for (ConstraintViolation violation : constraintViolationException.getConstraintViolations()) {
                ValidationError validationError = new ValidationError();
                validationError.setField(violation.getPropertyPath().toString());
                validationError.setMessage(violation.getMessage());
                validationError.setRejectedValue(violation.getInvalidValue());
                validationError.setEntity(violation.getLeafBean());
                validationErrors.add(validationError);
            }

            apiError.setErrors(validationErrors);
        } else {
            SqlError sqlError = new SqlError();
            sqlError.setMessage(exception.getMostSpecificCause().getLocalizedMessage());
            apiError.setErrors(List.of(sqlError));
        }

        return new ResponseEntity<>(apiError, HttpStatus.CONFLICT);
    }

    private ApiError createApiError() {
        ApiError apiError = new ApiError();
        apiError.setOccurredAt(currentDateTimeService.now());
        return apiError;
    }

    private static ValidationError getValidationError(FieldError error) {
        ValidationError validationError = new ValidationError();
        validationError.setField(error.getField());
        validationError.setMessage(error.getDefaultMessage());
        validationError.setRejectedValue(error.getRejectedValue());
        return validationError;
    }
}
