package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import pl.khuzzuk.remote.DTO;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.ATTACK;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.BATTLE;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.CHARISMA;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.CONTROL;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.DEXTERITY;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.DURABILITY;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.HEALTH;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.INITIATIVE;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.INTELLIGENCE;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.LEADER_SKILLS;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.SHOOTING;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.SPEED;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.STRENGTH;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.WILL;

@Getter
@Setter
@Embeddable
@Audited
@DTO
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
