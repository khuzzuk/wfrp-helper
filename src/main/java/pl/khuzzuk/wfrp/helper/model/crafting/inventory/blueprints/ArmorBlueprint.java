package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.common.EnumType;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;
import pl.khuzzuk.wfrp.helper.model.rule.Placement.PlacementValues;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import static pl.khuzzuk.wfrp.helper.model.rule.Placement.*;

@Getter
@Setter
@DiscriminatorValue("ARMOR")
@Entity
@RemoteEntity
public class ArmorBlueprint extends ItemBlueprint {
    @Type(type = EnumType.DEF)
    @PlacementValues({HEAD, TORSO, HAND, LEG, BELT, SHIELD})
    private Placement placement;
    private int armor;
}
