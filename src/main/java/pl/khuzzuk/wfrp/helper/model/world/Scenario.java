package pl.khuzzuk.wfrp.helper.model.world;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

@Data
@EqualsAndHashCode(of = "name")
@Entity
@Table(schema = "realm")
@RemoteEntity(transactional = true)
@SecuredService(allowRead = true)
public class Scenario extends BaseEntity {

  @Id
  @SequenceGenerator(name = "scenario_seq_gen",
                     schema = "realm",
                     sequenceName = "scenario_id_seq",
                     allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "scenario_seq_gen")
  private Long id;
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
