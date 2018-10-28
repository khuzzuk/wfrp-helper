package pl.khuzzuk.wfrp.helper.model.magic;

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
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
@EqualsAndHashCode(of = "name")
@Entity
public class SpellSchool {
    @Id
    @SequenceGenerator(name = "spell_school_seq_gen", sequenceName = "spell_school_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "spell_school_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    @Filter
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;
    private @Min(1) @Max(99) int levels = 1;
}
