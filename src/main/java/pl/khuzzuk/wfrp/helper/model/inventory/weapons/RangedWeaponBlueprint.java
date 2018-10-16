package pl.khuzzuk.wfrp.helper.model.inventory.weapons;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
public class RangedWeaponBlueprint extends WeaponBlueprint {
    private int minimumRange;
    private int mediumRange;
    private int maximumRange;
}
