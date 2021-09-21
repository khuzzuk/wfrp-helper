package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Getter;
import lombok.Setter;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(schema = "world")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Religion extends BaseEntity {
  private String name;
  private String description;
  @ManyToMany
  @JoinTable(schema = "world",
             name = "religion_nation",
             joinColumns = @JoinColumn(name = "religion_id"),
             inverseJoinColumns = @JoinColumn(name = "nation_id"))
  private List<Nation> nations;

}
