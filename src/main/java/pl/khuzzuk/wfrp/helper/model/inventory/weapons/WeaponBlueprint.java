package pl.khuzzuk.wfrp.helper.model.inventory.weapons;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.inventory.Wearable;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.Set;

@Getter
@Setter
@Entity
public class WeaponBlueprint extends Wearable {
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "weapon_modifiers",
            joinColumns = @JoinColumn(name = "weapon_id"),
            inverseJoinColumns = @JoinColumn(name = "modifier_id"))
    @FormElement(editor = EditorType.DELEGATED)
    private Set<Modifier> modifiers;
}
