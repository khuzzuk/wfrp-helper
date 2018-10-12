package pl.khuzzuk.wfrp.helper.model.skill;

import lombok.Data;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.FormElement;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Skill {
    @Id
    @GeneratedValue
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    private @Length(min = 3) String name;
    private String description;
}
