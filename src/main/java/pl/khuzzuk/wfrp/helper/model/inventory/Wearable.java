package pl.khuzzuk.wfrp.helper.model.inventory;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

@Getter
@Setter
public abstract class Wearable extends Item {
    private Placement placement;
}
