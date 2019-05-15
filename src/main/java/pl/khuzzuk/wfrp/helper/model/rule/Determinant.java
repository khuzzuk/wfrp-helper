package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import pl.khuzzuk.remote.DTO;
import pl.khuzzuk.wfrp.helper.repo.ListableEntity;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Audited
@DTO
public class Determinant extends ListableEntity {
    @Id
    @SequenceGenerator(name = "determinant_seq_gen", sequenceName = "determinant_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "determinant_seq_gen")
    private Long id;

    @Enumerated(EnumType.STRING)
    private DeterminantType type;

    private int value;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Modifier> modifiers;

    public static Determinant empty(DeterminantType type) {
        Determinant determinant = new Determinant();
        determinant.setType(type);

        Modifier regularMod = new Modifier();
        regularMod.setType(ModifierType.REGULAR);
        Modifier experienceMod = new Modifier();
        experienceMod.setType(ModifierType.EXPERIENCE);

        determinant.setModifiers(List.of(regularMod, experienceMod));
        return determinant;
    }
}
