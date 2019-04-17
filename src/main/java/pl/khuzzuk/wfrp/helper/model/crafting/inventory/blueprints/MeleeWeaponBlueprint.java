package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import pl.khuzzuk.remote.RemoteEntity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("MeleeWeaponBlueprint")
@RemoteEntity
public class MeleeWeaponBlueprint extends WeaponBlueprint {
}
