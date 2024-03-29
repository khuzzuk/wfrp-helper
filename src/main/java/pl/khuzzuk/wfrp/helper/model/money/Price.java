package pl.khuzzuk.wfrp.helper.model.money;

import lombok.Data;
import pl.javahello.DTO;

import javax.persistence.Embeddable;

@DTO
@Data
@Embeddable
public class Price {
    private int gold;
    private int silver;
    private int lead;
}
