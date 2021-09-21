package pl.khuzzuk.wfrp.helper.model.knowledge;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(schema = "knowledge")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Skill extends BaseEntity {
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 5000) String description;

    @Override
    public String toString() {
        return name;
    }
}
