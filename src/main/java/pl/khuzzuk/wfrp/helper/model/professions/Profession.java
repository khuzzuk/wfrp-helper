package pl.khuzzuk.wfrp.helper.model.professions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.skill.Skill;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import java.util.Set;

@Data
@Entity
@EqualsAndHashCode(of = {"id", "name"})
public class Profession {
    @Id
    @SequenceGenerator(name = "profession_seq_gen", sequenceName = "profession_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profession_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 64) String name;
    private String description;
    @ManyToOne
    @FormElement(editor = EditorType.CHOOSE)
    private ProfessionClass professionClass;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "profession_skill",
            joinColumns = @JoinColumn(name = "profession_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id"))
    @FormElement(editor = EditorType.CHOOSE)
    private Set<Skill> skills;

    @Override
    public String toString() {
        return name;
    }
}
