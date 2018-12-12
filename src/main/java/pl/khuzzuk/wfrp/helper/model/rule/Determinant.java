package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Data;
import lombok.EqualsAndHashCode;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(of = "type")
@Entity
public class Determinant {
    @Id
    @SequenceGenerator(name = "determinant_seq_gen", sequenceName = "determinant_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "determinant_seq_gen")
    @FormElement(exclude = true)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DeterminantType type;

    private int value;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @FormElement(editor = EditorType.DELEGATED)
    private Set<Modifier> modifiers;

    @Override
    public String toString() {
        return type +
                "=" + value +
                (modifiers.isEmpty() ? "" : modifiers.stream()
                        .map(Modifier::toString)
                        .collect(Collectors.joining(" + ", " + ", "")));
    }
}
