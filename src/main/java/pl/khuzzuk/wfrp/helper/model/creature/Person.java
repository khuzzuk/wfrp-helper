package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.inventory.MiscItem;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import java.util.List;
import java.util.Set;

@Data
@EqualsAndHashCode(of = "name")
@Entity
public class Person {
    @Id
    @SequenceGenerator(name = "person_seq_gen", sequenceName = "person_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    @Filter
    private @Length(min = 3, max = 255) String name;
    private @Length(max = 500) String description;
    private @Length(max = 4096) String history;

    @ManyToMany(fetch = FetchType.EAGER)
    @FormElement(editor = EditorType.CHOOSE)
    private Set<Skill> skills;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "spell_ingredients",
            joinColumns = @JoinColumn(name = "spell_id"),
            inverseJoinColumns = @JoinColumn(name = "ingrediend_id"))
    @FormElement(editor = EditorType.CHOOSE)
    private List<MiscItem> inventory;

    @ManyToMany(fetch = FetchType.EAGER)
    @FormElement(editor = EditorType.CHOOSE)
    private Set<Animal> animals;
}
