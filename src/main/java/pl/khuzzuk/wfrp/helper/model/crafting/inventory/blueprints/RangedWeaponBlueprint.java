package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import pl.javahello.RemoteEntity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Getter
@Setter
@Entity
@DiscriminatorValue("RANGED_WEAPON")
@RemoteEntity
public class RangedWeaponBlueprint extends WeaponBlueprint {
    private int minimumRange;
    private int mediumRange;
    private int maximumRange;
}
