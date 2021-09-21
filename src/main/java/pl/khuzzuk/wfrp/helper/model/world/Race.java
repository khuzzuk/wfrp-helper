package pl.khuzzuk.wfrp.helper.model.world;

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
@Table(schema = "world")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Race extends BaseEntity {
    private @Length(min = 3, max = 64) String name;
    private String specialFeatures;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinTable(schema = "world")
    private Set<Determinant> determinants;

    @ManyToMany
    @JoinTable(schema = "world",
            name = "race_nation",
            joinColumns = @JoinColumn(name = "race_id"),
            inverseJoinColumns = @JoinColumn(name = "nation_id"))
    private Set<Nation> nations;

    @Override
    public String toString() {
        return name;
    }
}
