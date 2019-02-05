package pl.khuzzuk.wfrp.helper.repo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseDTO {
    private Long id;
    private Long version;
}
