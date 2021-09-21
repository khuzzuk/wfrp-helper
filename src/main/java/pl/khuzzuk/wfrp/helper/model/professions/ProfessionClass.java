package pl.khuzzuk.wfrp.helper.model.professions;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(schema = "knowledge")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class ProfessionClass extends BaseEntity {
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 500) String description;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(schema = "knowledge",
            name = "profession_class_skills",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "skills_id"))
    private Set<Skill> skills;

    @Override
    public String toString() {
        return name;
    }
}
