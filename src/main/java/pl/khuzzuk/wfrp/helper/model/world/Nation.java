package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Data
@EqualsAndHashCode(of = "name")
@Entity
public class Nation {
    @Id
    @SequenceGenerator(name = "nation_seq_gen", sequenceName = "nation_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "nation_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    @Filter
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;
}
