package pl.khuzzuk.wfrp.helper.repo;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@EqualsAndHashCode(of = "uuid", callSuper = false)
public abstract class ListableDTO extends BaseDTO {
    private String uuid = UUID.randomUUID().toString();
}
