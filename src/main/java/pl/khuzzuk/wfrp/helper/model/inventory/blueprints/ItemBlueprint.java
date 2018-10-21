package pl.khuzzuk.wfrp.helper.model.inventory.blueprints;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.money.Price;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.CascadeType;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import java.util.Set;

@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Entity
public abstract class ItemBlueprint {
    @Id
    @SequenceGenerator(name = "item_blueprint_seq_gen", sequenceName = "item_blueprint_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_blueprint_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 500) String description;
    @Embedded
    @FormElement(editor = EditorType.EMBEDDED)
    private Price suggestedPrice;
    private float suggestedWeight;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "item_blueprint_determinants",
            joinColumns = @JoinColumn(name = "item_blueprint_id"),
            inverseJoinColumns = @JoinColumn(name = "determinant_id"))
    @FormElement(editor = EditorType.DELEGATED)
    private Set<Determinant> determinants;

    @Override
    public String toString() {
        return name;
    }
}
