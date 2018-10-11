package pl.khuzzuk.wfrp.helper.model.professions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.skill.Skill;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.Set;

@Data
@Entity
@EqualsAndHashCode(of = {"id", "name"})
public class Profession {
    @Id
    @GeneratedValue
    @FormElement(exclude = true)
    private Long id;
    private String name;
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
