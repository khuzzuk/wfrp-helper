package pl.khuzzuk.wfrp.helper.model.inventory.weapons;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.edit.EnumFilter;
import pl.khuzzuk.wfrp.helper.model.inventory.Wearable;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
public class ArmorBlueprint extends Wearable {
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
