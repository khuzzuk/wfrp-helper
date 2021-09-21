package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.Getter;
import lombok.Setter;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints.RangedWeaponBlueprint;

import javax.persistence.*;

@Getter
@Setter
@Entity
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class RangedWeapon extends Wearable {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_blueprint_id")
    private RangedWeaponBlueprint type;
}
