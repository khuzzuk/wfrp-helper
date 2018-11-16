package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import java.util.Set;

@Data
@EqualsAndHashCode(of = "name")
@Entity
public class PhysicalFeature {
    @Id
    @SequenceGenerator(name = "character_seq_gen", sequenceName = "character_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "character_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    @Filter
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @FormElement(editor = EditorType.DELEGATED)
    private Set<Determinant> determinants;

    @Override
    public String toString() {
        return name;
    }
}