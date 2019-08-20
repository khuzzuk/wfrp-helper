package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.*;
import java.util.Set;

@Data
@EqualsAndHashCode(of = {"name"})
@Entity
@Table(schema = "world")
@RemoteEntity
public class Race {
    @Id
    @SequenceGenerator(name = "race_seq_gen", schema = "world", sequenceName = "race_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "race_seq_gen")
    private Long id;

    @NaturalId
    private @Length(min = 3, max = 64) String name;

    private String specialFeatures;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinTable(schema = "world")
    private Set<Determinant> determinants;

    @ManyToMany
    @JoinTable(schema = "world",
            name = "race_nation",
            joinColumns = @JoinColumn(name = "race_id"),
            inverseJoinColumns = @JoinColumn(name = "nation_id"))
    private Set<Nation> nations;

    @Override
    public String toString() {
        return name;
    }
}
