package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Getter;
import lombok.Setter;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(schema = "world", name = "language")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class WorldLanguage extends BaseEntity {
    private @Size(min = 3, max = 64) String name;
    private @Size(max = 500) String description;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(schema = "world",
            joinColumns = @JoinColumn(name = "language_id"),
            inverseJoinColumns = @JoinColumn(name = "nations_id"))
    private Set<Nation> nations;
}
