package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import pl.javahello.RemoteEntity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import pl.javahello.RemoteEntity.SecuredService;

@Entity
@DiscriminatorValue("MELEE_WEAPON")
@RemoteEntity(transactional = true)
@SecuredService(allowRead = true)
public class MeleeWeaponBlueprint extends WeaponBlueprint {
}
