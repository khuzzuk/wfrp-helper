package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("MELEE_WEAPON")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class MeleeWeaponBlueprint extends WeaponBlueprint {
}
