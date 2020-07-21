package pl.khuzzuk.wfrp.helper.model.knowledge;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import pl.javahello.RemoteEntity.SecuredService;

@Data
@EqualsAndHashCode(of = "name")
@Entity
@RemoteEntity(transactional = true)
@SecuredService(allowRead = true)
public class Skill {
    @Id
    @SequenceGenerator(name = "skill_seq_gen", sequenceName = "skill_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "skill_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 5000) String description;

    @Override
    public String toString() {
        return name;
    }
}
