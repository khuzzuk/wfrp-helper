package pl.khuzzuk.wfrp.helper.model;

import lombok.Data;
import org.hibernate.annotations.NaturalId;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class Race {
    @Id
    @GeneratedValue
    private Long id;

    @NaturalId
    private String name;

    private String specialFeatures;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Determinant> determinants;
}
