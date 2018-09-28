package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(of = "id")
@Entity
public class Modifier {
    @Id
    @GeneratedValue
    private Long id;

    private @Min(-100) @Max(100) int value;

    @Column(nullable = false)
    private @NotNull ModifierType type = ModifierType.REGULAR;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<DiceRoll> rolls;

    @Override
    public String toString() {
        return type + " "
                + (rolls.isEmpty() ? ""
                : rolls.stream().map(Object::toString).collect(Collectors.joining("+"))) + "+"
                + value;
    }
}
