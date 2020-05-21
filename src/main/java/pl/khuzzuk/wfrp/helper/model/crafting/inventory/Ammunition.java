package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.Getter;
import lombok.Setter;
import pl.javahello.RemoteEntity;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints.RangedWeaponBlueprint;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@RemoteEntity
public class Ammunition extends Wearable {
    @ManyToMany
    @JoinTable(schema = "crafting",
            name = "weapon_ammunition",
            joinColumns = @JoinColumn(name = "ranged_weapon_id"),
            inverseJoinColumns = @JoinColumn(name = "ammunition_id"))
    private List<RangedWeaponBlueprint> weaponTypes;
}
