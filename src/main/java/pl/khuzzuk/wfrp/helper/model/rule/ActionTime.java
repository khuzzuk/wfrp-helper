package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.validation.constraints.Min;

@Data
@Embeddable
public class ActionTime {
    private ActionType type;
    private @Min(1) int amount = 1;
}
