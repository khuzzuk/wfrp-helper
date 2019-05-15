package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import java.util.Set;

@Data
@EqualsAndHashCode(of = {"name"})
@Entity
@RemoteEntity
public class Race {
    @Id
    @SequenceGenerator(name = "race_seq_gen", sequenceName = "race_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "race_seq_gen")
    private Long id;

    @NaturalId
    private @Length(min = 3, max = 64) String name;

    private String specialFeatures;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Determinant> determinants;

    @Override
    public String toString() {
        return name;
    }
}
