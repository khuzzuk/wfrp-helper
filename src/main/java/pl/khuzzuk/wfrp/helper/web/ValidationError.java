package pl.khuzzuk.wfrp.helper.web;

import lombok.Data;
import pl.khuzzuk.wfrp.helper.web.ApiError.Reason;

@Data
class ValidationError extends Reason {
    private Object entity;
    private String message;
    private String field;
    private Object rejectedValue;
}
