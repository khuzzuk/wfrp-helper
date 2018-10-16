package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Data;
import lombok.EqualsAndHashCode;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(of = "id")
@Entity
public class Modifier {
    @Id
    @GeneratedValue
    @FormElement(exclude = true)
    private Long id;

    private @Min(-100) @Max(100) int value;

    @Column(nullable = false)
    private @NotNull ModifierType type = ModifierType.REGULAR;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @FormElement(editor = EditorType.DELEGATED)
    private List<DiceRoll> rolls = new ArrayList<>();

    @Override
    public String toString() {
        return (rolls.isEmpty() ? ""
                : rolls.stream().map(Object::toString).collect(Collectors.joining("+"))) + "+"
                + value;
    }
}
