package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.model.money.Price;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", length = 255)
@Entity
@Table(schema = "crafting")
public abstract class ItemBlueprint extends BaseEntity {
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
