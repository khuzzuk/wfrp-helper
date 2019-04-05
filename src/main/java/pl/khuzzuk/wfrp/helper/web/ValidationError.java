package pl.khuzzuk.wfrp.helper.web;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
class ValidationError extends ApiError.Reason {
    private Object entity;
    private String message;
    private String field;
    private Object rejectedValue;
}
