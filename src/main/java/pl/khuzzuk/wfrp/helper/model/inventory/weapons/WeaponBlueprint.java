package pl.khuzzuk.wfrp.helper.model.inventory.weapons;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.inventory.Wearable;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;

@Getter
@Setter
public abstract class WeaponBlueprint extends Wearable {
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @FormElement(editor = EditorType.DELEGATED)
    private Modifier damage;
}
