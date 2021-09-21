package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Getter;
import lombok.Setter;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchool;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(schema = "realm")
@RemoteEntity(transactional = true)
@SecuredService(allowRead = true)
public class Realm extends BaseEntity {
  private String name;
  @ManyToMany
  @JoinTable(schema = "realm", inverseJoinColumns = @JoinColumn(name = "nation_id"))
  private List<Nation> nations;
  @ManyToMany
  @JoinTable(schema = "realm", inverseJoinColumns = @JoinColumn(name = "spell_school_id"))
  private List<SpellSchool> spellSchools;
  @ManyToMany
  @JoinTable(schema = "realm", inverseJoinColumns = @JoinColumn(name = "person_id"))
  private List<Person> persons;
}
