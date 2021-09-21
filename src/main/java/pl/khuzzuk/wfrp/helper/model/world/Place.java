package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
@Table(schema = "world")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Place extends BaseEntity {
  private @Length(min = 3, max = 64) String name;
  private @Length(max = 5000) String description;
  @ManyToOne
  private @NotNull Nation nation;
}
