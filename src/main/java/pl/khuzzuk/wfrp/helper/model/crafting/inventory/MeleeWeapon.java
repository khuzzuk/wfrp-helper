package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints.MeleeWeaponBlueprint;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@Entity
@RemoteEntity
public class MeleeWeapon extends Wearable {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_blueprint_id")
    private MeleeWeaponBlueprint type;
}
