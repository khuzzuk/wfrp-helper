package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Data;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.model.rule.DeterminantType;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;
import pl.khuzzuk.wfrp.helper.model.rule.ModifierType;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Data
@Embeddable
public class PersonDeterminants {
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "person_determinants",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "determinants_id"))
    private Set<Determinant> determinants = new HashSet<>();

    public static PersonDeterminants empty() {
        Determinant speed = new Determinant();
        speed.setType(DeterminantType.SPEED);
        Modifier regularMod = new Modifier();
        regularMod.setType(ModifierType.REGULAR);
        Modifier experienceMod = new Modifier();
        experienceMod.setType(ModifierType.EXPERIENCE);
        speed.setModifiers(Set.of(regularMod, experienceMod));

        Determinant battle = new Determinant();
        battle.setType(DeterminantType.BATTLE);
        regularMod = new Modifier();
        regularMod.setType(ModifierType.REGULAR);
        experienceMod = new Modifier();
        experienceMod.setType(ModifierType.EXPERIENCE);
        battle.setModifiers(Set.of(regularMod, experienceMod));

        PersonDeterminants determinants = new PersonDeterminants();
        determinants.setDeterminants(Set.of(
                speed, battle
        ));
        return determinants;
    }
}
