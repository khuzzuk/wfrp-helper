package pl.khuzzuk.wfrp.helper.model.professions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import java.util.Set;

@Data
@Entity
@EqualsAndHashCode(of = {"id", "name"})
public class ProfessionClass {
    @Id
    @SequenceGenerator(name = "profession_class_seq_gen", sequenceName = "profession_class_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profession_class_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @Filter
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 500) String description;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER, mappedBy = "professionClass")
    private Set<Profession> professions;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "profession_class_skills",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "skills_id"))
    @FormElement(editor = EditorType.CHOOSE)
    private Set<Skill> skills;

    @Override
    public String toString() {
        return name;
    }
}
