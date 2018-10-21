package pl.khuzzuk.wfrp.helper.model.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.EnumFilter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.inventory.ArmorPattern;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "armor_pattern_id")
    @FormElement(editor = EditorType.CHOOSE)
    private ArmorPattern armorPattern;
    private Placement placement;
    private int armor;
}
