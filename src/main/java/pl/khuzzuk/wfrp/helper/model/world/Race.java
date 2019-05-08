package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.*;
import java.util.Set;

@Data
@EqualsAndHashCode(of = {"name"})
@Entity
@RemoteEntity
public class Race {
    @Id
    @SequenceGenerator(name = "race_seq_gen", sequenceName = "race_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "race_seq_gen")
    @FormElement(exclude = true)
    private Long id;

    @NaturalId
    private @Length(min = 3, max = 64) String name;

    private String specialFeatures;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @FormElement(editor = EditorType.DELEGATED)
    private Set<Determinant> determinants;

    @Override
    public String toString() {
        return name;
    }
}