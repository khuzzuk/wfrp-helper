package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Getter
@Setter
@Entity
@DiscriminatorValue("RANGED_WEAPON")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class RangedWeaponBlueprint extends WeaponBlueprint {
    private int minimumRange;
    private int mediumRange;
    private int maximumRange;
}
