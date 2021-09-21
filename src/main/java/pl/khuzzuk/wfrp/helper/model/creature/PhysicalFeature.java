package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(schema = "creature")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class PhysicalFeature extends BaseEntity {
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(schema = "creature")
    private Set<Determinant> determinants;

    @Override
    public String toString() {
        return name;
    }
}
