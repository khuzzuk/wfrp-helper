package pl.khuzzuk.wfrp.helper.model.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.edit.EnumFilter;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

import javax.persistence.Entity;

@Getter
@Setter
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
    private Placement placement;
    private int armor;
}
