package pl.khuzzuk.wfrp.helper.model.knowledge;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;
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
@RemoteEntity
public class Skill {
    @Id
    @SequenceGenerator(name = "skill_seq_gen", sequenceName = "skill_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "skill_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    @Filter
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 500) String description;

    @Override
    public String toString() {
        return name;
    }
}
