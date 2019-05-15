package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints.ArmorBlueprint;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@Entity
@RemoteEntity
public class Armor extends Wearable {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_blueprint_id")
    private ArmorBlueprint type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "armor_pattern_id")
    private ArmorPattern armorPattern;
}
