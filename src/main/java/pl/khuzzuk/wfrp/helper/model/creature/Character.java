package pl.khuzzuk.wfrp.helper.model.creature;

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
@Table(schema = "creature")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Character extends BaseEntity {
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;

    @Override
    public String toString() {
        return name;
    }
}
