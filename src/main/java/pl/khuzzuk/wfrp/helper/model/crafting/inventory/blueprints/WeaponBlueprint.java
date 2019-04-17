package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import pl.khuzzuk.wfrp.helper.common.EnumType;
import pl.khuzzuk.wfrp.helper.model.rule.ActionTime;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

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
    private Modifier damage;
    @Type(type = EnumType.DEF)
    private Placement placement;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "type", column = @Column(name = "prepare_type")),
            @AttributeOverride(name = "amount", column = @Column(name = "prepare_amount"))
    })
    private ActionTime prepareTime;
}
