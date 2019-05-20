package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.repo.ListableEntity;

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

@Getter
@Setter
@Entity
@Table(schema = "world")
@RemoteEntity
public class Nation extends ListableEntity {
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
