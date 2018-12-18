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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import java.util.Set;

@Data
@EqualsAndHashCode(of = "id")
@Entity
public class Animal {
    @Id
    @SequenceGenerator(name = "animal_seq_gen", sequenceName = "animal_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "animal_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    @Filter
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;
    @ManyToOne(fetch = FetchType.EAGER)
    @FormElement(editor = EditorType.CHOOSE)
    private AnimalKind animalKind;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @FormElement(editor = EditorType.DELEGATED)
    private Set<Determinant> determinants;
}
