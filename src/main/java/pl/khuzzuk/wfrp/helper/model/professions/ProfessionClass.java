package pl.khuzzuk.wfrp.helper.model.professions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import java.util.Set;

@Data
@EqualsAndHashCode(of = {"name"})
@Entity
@RemoteEntity(transactional = true)
@SecuredService(allowRead = true)
public class ProfessionClass {
    @Id
    @SequenceGenerator(name = "profession_class_seq_gen", sequenceName = "profession_class_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profession_class_seq_gen")
    private Long id;
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 500) String description;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "profession_class_skills",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "skills_id"))
    private Set<Skill> skills;

    @Override
    public String toString() {
        return name;
    }
}
