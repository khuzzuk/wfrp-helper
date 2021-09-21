package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.*;

@Getter
@Setter
@Embeddable
@Audited
@DTO
public class CreatureDeterminants {
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "person_determinants",
            schema = "creature",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "determinants_id"))
    private List<Determinant> determinants = new ArrayList<>();

    public static CreatureDeterminants empty() {
        CreatureDeterminants determinants = new CreatureDeterminants();
        determinants.setDeterminants(List.of(
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
