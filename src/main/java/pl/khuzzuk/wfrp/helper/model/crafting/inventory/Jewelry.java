package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
@RemoteEntity
public class Jewelry extends Wearable {
    @Placement.PlacementValues({Placement.FINGER, Placement.NECK})
    private Placement placement;
}
