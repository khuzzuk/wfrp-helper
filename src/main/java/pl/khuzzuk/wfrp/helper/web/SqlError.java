package pl.khuzzuk.wfrp.helper.web;

import lombok.Data;

@Data
class SqlError extends ApiError.Reason {
    private String message;
}
