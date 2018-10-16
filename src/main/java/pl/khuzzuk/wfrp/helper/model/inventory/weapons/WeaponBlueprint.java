package pl.khuzzuk.wfrp.helper.model.inventory.weapons;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.inventory.Wearable;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import java.util.Set;

@Getter
@Setter
public abstract class WeaponBlueprint extends Wearable {
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "weapon_determinants",
            joinColumns = @JoinColumn(name = "weapon_id"),
            inverseJoinColumns = @JoinColumn(name = "determinant_id"))
    @FormElement(editor = EditorType.DELEGATED)
    private Set<Determinant> determinants;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @FormElement(editor = EditorType.DELEGATED)
    private Modifier damage;
}
