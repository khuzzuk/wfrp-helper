package pl.khuzzuk.wfrp.helper.model.world.language;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.model.world.nation.Nation;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@EqualsAndHashCode(of = "name")
@Entity
@RemoteEntity
public class Language {
    @Id
    @SequenceGenerator(name = "language_seq_gen", sequenceName = "language_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "language_seq_gen")
    private Long id;
    @NaturalId
    private @Size(min = 3, max = 64) String name;
    private @Size(max = 500) String description;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Nation> nations;
}
