package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(schema = "rules")
@Audited
@DTO
public class Determinant extends BaseEntity {
    @Enumerated(EnumType.STRING)
    private DeterminantType type;
    private int value;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinTable(schema = "rules")
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
