package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Data;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.*;

@Data
@Embeddable
public class PersonDeterminants {
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "person_determinants",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "determinants_id"))
    private Set<Determinant> determinants = new HashSet<>();

    public static PersonDeterminants empty() {
        PersonDeterminants determinants = new PersonDeterminants();
        determinants.setDeterminants(Set.of(
                Determinant.empty(SPEED),
                Determinant.empty(BATTLE),
                Determinant.empty(SHOOTING),
                Determinant.empty(STRENGTH),
                Determinant.empty(DURABILITY),
                Determinant.empty(HEALTH),
                Determinant.empty(INITIATIVE),
                Determinant.empty(ATTACK),
                Determinant.empty(DEXTERITY),
                Determinant.empty(LEADER_SKILLS),
                Determinant.empty(INTELLIGENCE),
                Determinant.empty(CONTROL),
                Determinant.empty(WILL),
                Determinant.empty(CHARISMA)
        ));
        return determinants;
    }
}
