package pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.common.EnumType;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;
import pl.khuzzuk.wfrp.helper.model.rule.Placement.*;

import javax.persistence.*;
import java.util.List;

import static pl.khuzzuk.wfrp.helper.model.rule.Placement.*;

@Getter
@Setter
@DiscriminatorValue("ARMOR")
@Entity
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class ArmorBlueprint extends ItemBlueprint {
    @Type(type = EnumType.DEF)
    @PlacementValues({HEAD, TORSO, HAND, LEG, BELT, SHIELD})
    @ElementCollection
    @JoinTable(name = "item_blueprint_placements",
            schema = "crafting",
            joinColumns = @JoinColumn(name = "item_blueprint_id"))
    private List<Placement> placement;
    private int armor;
}
