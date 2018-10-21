package pl.khuzzuk.wfrp.helper.model.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.EnumFilter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;

@Getter
@Setter
@Entity
public abstract class WeaponBlueprint extends ItemBlueprint {
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @FormElement(editor = EditorType.DELEGATED)
    private Modifier damage;
    @EnumFilter({"HAND", "BOTH_HANDS"})
    private Placement placement;
}
