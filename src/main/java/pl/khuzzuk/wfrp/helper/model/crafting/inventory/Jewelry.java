package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.Getter;
import lombok.Setter;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Jewelry extends Wearable {
    @Placement.PlacementValues({Placement.FINGER, Placement.NECK})
    private Placement placement;
}
