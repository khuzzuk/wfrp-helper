package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(schema = "realm")
@RemoteEntity(transactional = true)
@SecuredService(allowRead = true)
public class Scenario extends BaseEntity {
  private @Length(min = 3, max = 255) String name;
  @ManyToOne
  private Realm realm;
  @ManyToMany
  @JoinTable(schema = "realm",
             name = "scenario_place",
             inverseJoinColumns = @JoinColumn(name = "place_id"))
  private List<Place> places;
  @ManyToMany
  @JoinTable(schema = "realm",
             name = "scenario_person",
             inverseJoinColumns = @JoinColumn(name = "person_id"))
  private List<Person> persons;
}
