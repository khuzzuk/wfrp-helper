package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Data;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import java.util.Set;

@Data
@Embeddable
public class PersonDeterminants {
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinTable(name = "person_determinants",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "determinants_id"))
    private Set<Determinant> determinants;
}
