package pl.khuzzuk.wfrp.helper.model.skill;

import lombok.Data;
import org.hibernate.annotations.NaturalId;
import pl.khuzzuk.wfrp.helper.edit.FormElement;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

@Data
@Entity
public class Skill {
    @Id
    @GeneratedValue
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    private @NotEmpty  String name;
    private String description;
}
