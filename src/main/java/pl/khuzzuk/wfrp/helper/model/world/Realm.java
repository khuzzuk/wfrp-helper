package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.model.creature.Person;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.List;

@Getter
@Setter
@Entity
@Table(schema = "realm")
@RemoteEntity
public class Realm {
    @SequenceGenerator(name = "realm_id_seq_gen", schema = "realm", sequenceName = "realm_id_seq")
    @GeneratedValue(generator = "realm_id_seq_gen", strategy = GenerationType.SEQUENCE)
    @Id
    private Long id;
    @NaturalId
    private String name;
    @ManyToMany
    @JoinTable(schema = "realm", inverseJoinColumns = @JoinColumn(name = "nation_id"))
    private List<Nation> nations;
    @ManyToMany
    @JoinTable(schema = "realm", inverseJoinColumns = @JoinColumn(name = "person_id"))
    private List<Person> persons;
}
