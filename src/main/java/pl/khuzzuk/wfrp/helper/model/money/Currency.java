package pl.khuzzuk.wfrp.helper.model.money;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.world.Nation;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(schema = "world")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Currency extends BaseEntity {
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;
    private @Min(0) float valueMultiplier;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(schema = "world")
    private Set<Nation> nations;
}
