package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@EqualsAndHashCode(of = "id")
@Entity
public class Modifier {
    @Id
    @GeneratedValue
    private Long id;

    private int value;
}
