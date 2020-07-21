package pl.khuzzuk.wfrp.helper.model.world;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import pl.javahello.RemoteEntity;

import javax.persistence.*;
import java.util.List;
import pl.javahello.RemoteEntity.SecuredService;

@Getter
@Setter
@EqualsAndHashCode(of = "name")
@Entity
@Table(schema = "world")
@RemoteEntity(transactional = true)
@SecuredService(allowRead = true)
public class Religion {
    @SequenceGenerator(name = "religion_id_seq_gen", schema = "world", sequenceName = "religion_id_seq")
    @GeneratedValue(generator = "religion_id_seq_gen", strategy = GenerationType.SEQUENCE)
    @Id
    private Long id;
    @NaturalId
    private String name;
    private String description;
    @ManyToMany
    @JoinTable(schema = "world", name = "religion_nation",
            joinColumns = @JoinColumn(name = "religion_id"),
            inverseJoinColumns = @JoinColumn(name = "nation_id"))
    private List<Nation> nations;

}
