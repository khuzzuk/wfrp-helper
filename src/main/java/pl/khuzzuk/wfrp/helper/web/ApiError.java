package pl.khuzzuk.wfrp.helper.web;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

@Data
class ApiError {
    private HttpStatus httpStatus;
    private LocalDateTime occurredAt;
    private List<? extends Reason> errors;

    static class Reason {
    }
}
