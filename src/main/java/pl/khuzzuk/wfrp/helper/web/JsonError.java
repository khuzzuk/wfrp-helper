package pl.khuzzuk.wfrp.helper.web;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class JsonError extends ApiError.Reason {
    private String message;
}
