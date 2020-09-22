package pl.khuzzuk.wfrp.helper.repo;

import java.util.UUID;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "uuid")
@MappedSuperclass
public abstract class ListableBaseEntity extends BaseEntity {
  private @NotNull String uuid = UUID.randomUUID().toString();
}
