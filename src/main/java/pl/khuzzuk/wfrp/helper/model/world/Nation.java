package pl.khuzzuk.wfrp.helper.model.world;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Set;
import pl.javahello.RemoteEntity.SecuredService;

@Getter
@Setter
@EqualsAndHashCode(of = "name")
@Entity
@Table(schema = "world")
@RemoteEntity(transactional = true)
@SecuredService(allowRead = true)
public class Nation {
    @Id
    @SequenceGenerator(name = "nation_id_seq_gen", allocationSize = 1,
            schema = "world", sequenceName = "nation_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "nation_id_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 50_000) String description;

    @ElementCollection
    @CollectionTable(schema = "world", name = "culture_name",
            joinColumns = @JoinColumn(name = "nation_id"))
    @Column(name = "name")
    private Set<String> names;
}
