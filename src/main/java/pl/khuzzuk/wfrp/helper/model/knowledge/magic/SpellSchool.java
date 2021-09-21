package pl.khuzzuk.wfrp.helper.model.knowledge.magic;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Getter
@Setter
@Entity
@Table(schema = "magic")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class SpellSchool extends BaseEntity {
  private @Length(min = 3, max = 64) String name;
  private @Length(max = 500) String description;
  private @Min(1) @Max(99) int levels = 1;

  @Override
  public String toString() {
    return name;
  }
}
