package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import pl.khuzzuk.wfrp.helper.common.EnumType;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.EnumFilter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;
import pl.khuzzuk.wfrp.helper.model.rule.ActionTime;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
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
    @Type(type = EnumType.DEF)
    private Placement placement;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "type", column = @Column(name = "prepare_type")),
            @AttributeOverride(name = "amount", column = @Column(name = "prepare_amount"))
    })
    private ActionTime prepareTime;
}
