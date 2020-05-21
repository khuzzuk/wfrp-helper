package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Data;
import org.hibernate.annotations.Type;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.common.EnumType;

import javax.persistence.Embeddable;
import javax.validation.constraints.Min;

@Data
@Embeddable
@DTO
public class ActionTime {
    @Type(type = EnumType.DEF)
    private ActionType type;
    private @Min(1) int amount = 1;
}
