package pl.khuzzuk.wfrp.helper.repo;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
@Setter
@EqualsAndHashCode(of = "uuid")
@MappedSuperclass
public abstract class ListableEntity {
    private @NotNull String uuid = UUID.randomUUID().toString();
}
