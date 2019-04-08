package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import pl.khuzzuk.wfrp.helper.common.EnumType;
import pl.khuzzuk.wfrp.helper.edit.EnumFilter;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Getter
@Setter
@DiscriminatorValue("ARMOR")
@Entity
public class ArmorBlueprint extends ItemBlueprint {
    @EnumFilter({
            "HEAD",
            "TORSO",
            "HAND",
            "LEG",
            "BELT",
            "SHIELD",
    })
    @Type(type = EnumType.DEF)
    private Placement placement;
    private int armor;
}
