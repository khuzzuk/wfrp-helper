package pl.khuzzuk.wfrp.helper.model.money;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.world.nation.Nation;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.Min;
import java.util.Set;

@Data
@EqualsAndHashCode(of = "name")
@Entity
public class Currency {
    @Id
    @SequenceGenerator(name = "currency_seq_gen", sequenceName = "currency_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "currency_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    @Filter
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;
    private @Min(0) float valueMultiplier;
    @ManyToMany(fetch = FetchType.EAGER)
    @FormElement(editor = EditorType.CHOOSE)
    private Set<Nation> nations;
}
