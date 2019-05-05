package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import pl.khuzzuk.remote.RemoteEntity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@EqualsAndHashCode(of = "name")
@Entity
@Table(name = "language")
@RemoteEntity
public class WorldLanguage {
    @Id
    @SequenceGenerator(name = "language_seq_gen", sequenceName = "language_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "language_seq_gen")
    private Long id;
    @NaturalId
    private @Size(min = 3, max = 64) String name;
    private @Size(max = 500) String description;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(joinColumns = @JoinColumn(name = "language_id"), inverseJoinColumns = @JoinColumn(name = "nations_id"))
    private Set<Nation> nations;
}
