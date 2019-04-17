package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.model.money.Price;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorColumn;
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
@EqualsAndHashCode(of = "id")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", length = 255)
@Entity
public abstract class ItemBlueprint {
    @Id
    @SequenceGenerator(name = "item_blueprint_seq_gen", sequenceName = "item_blueprint_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_blueprint_seq_gen")
    private Long id;
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 500) String description;
    @Embedded
    private Price suggestedPrice;
    private float suggestedWeight;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "item_blueprint_determinants",
            joinColumns = @JoinColumn(name = "item_blueprint_id"),
            inverseJoinColumns = @JoinColumn(name = "determinant_id"))
    private Set<Determinant> determinants;

    @Override
    public String toString() {
        return name;
    }
}
