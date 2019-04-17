package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.remote.RemoteEntity;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
@RemoteEntity
public class RangedWeaponBlueprint extends WeaponBlueprint {
    private int minimumRange;
    private int mediumRange;
    private int maximumRange;
}
