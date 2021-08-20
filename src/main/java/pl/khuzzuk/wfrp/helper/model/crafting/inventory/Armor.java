package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints.ArmorBlueprint;

@Getter
@Setter
@Entity
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Armor extends Wearable {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_blueprint_id")
    private ArmorBlueprint type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "armor_pattern_id")
    private ArmorPattern armorPattern;
}
