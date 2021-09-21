package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import pl.khuzzuk.wfrp.helper.common.EnumType;
import pl.khuzzuk.wfrp.helper.model.rule.ActionTime;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;
import pl.khuzzuk.wfrp.helper.model.rule.Placement.*;

import javax.persistence.*;
import java.util.List;

import static pl.khuzzuk.wfrp.helper.model.rule.Placement.*;

@Getter
@Setter
@Entity
public abstract class WeaponBlueprint extends ItemBlueprint {
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Modifier damage;
    @Type(type = EnumType.DEF)
    @PlacementValues({HAND, BOTH_HANDS, SHIELD})
    @ElementCollection
    @JoinTable(schema = "crafting",
            name = "item_blueprint_placements",
            joinColumns = @JoinColumn(name = "item_blueprint_id"))
    private List<Placement> placement;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "type", column = @Column(name = "prepare_type")),
            @AttributeOverride(name = "amount", column = @Column(name = "prepare_amount"))
    })
    private ActionTime prepareTime;
}
