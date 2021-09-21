package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(schema = "world")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Nation extends BaseEntity {
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 50_000) String description;

    @ElementCollection
    @CollectionTable(schema = "world", name = "culture_name",
            joinColumns = @JoinColumn(name = "nation_id"))
    @Column(name = "name")
    private Set<String> names;
}
