package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.edit.EnumFilter;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
public class Jewelry extends Wearable {
    @EnumFilter({"NECK", "FINGER"})
    private Placement placement;
}
