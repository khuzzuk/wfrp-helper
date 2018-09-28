package pl.khuzzuk.wfrp.helper.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@EqualsAndHashCode(of = {"id", "name"})
public class Race {
    @Id
    @GeneratedValue
    @FormElement(exclude = true)
    private Long id;

    @NaturalId
    private String name;

    private String specialFeatures;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @FormElement(editor = EditorType.DELEGATED)
    private Set<Determinant> determinants;
}
