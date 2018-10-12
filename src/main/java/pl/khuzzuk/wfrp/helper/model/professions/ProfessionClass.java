package pl.khuzzuk.wfrp.helper.model.professions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.skill.Skill;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@EqualsAndHashCode(of = {"id", "name"})
public class ProfessionClass {
    @Id
    @GeneratedValue
    @FormElement(exclude = true)
    private Long id;
    private String name;
    private String description;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER, mappedBy = "professionClass")
    private Set<Profession> professions;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "class_skills",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id"))
    @FormElement(editor = EditorType.CHOOSE)
    private Set<Skill> skills;

    @Override
    public String toString() {
        return name;
    }
}
