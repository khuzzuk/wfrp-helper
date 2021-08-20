package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;
import pl.khuzzuk.wfrp.helper.model.money.Price;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.*;
import java.util.List;

@Data
@EqualsAndHashCode(of = "id", callSuper = false)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", length = 255)
@Entity
@Table(schema = "crafting")
public abstract class ItemBlueprint extends BaseEntity {
    @Id
    @SequenceGenerator(name = "item_blueprint_seq_gen", schema = "crafting", sequenceName = "item_blueprint_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_blueprint_seq_gen")
    private Long id;
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 500) String description;
    @Embedded
    private Price suggestedPrice;
    private float suggestedWeight;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "item_blueprint_determinants",
            schema = "crafting",
            joinColumns = @JoinColumn(name = "item_blueprint_id"),
            inverseJoinColumns = @JoinColumn(name = "determinant_id"))
    private List<Determinant> determinants;

    @Override
    public String toString() {
        return name;
    }
}
