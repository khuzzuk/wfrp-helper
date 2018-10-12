package pl.khuzzuk.wfrp.helper.model.money;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class Price {
    private int gold;
    private int silver;
    private int lead;
}
