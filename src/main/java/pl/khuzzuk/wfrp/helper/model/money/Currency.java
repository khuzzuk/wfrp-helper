package pl.khuzzuk.wfrp.helper.model.money;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.model.world.Nation;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import java.util.Set;

@Data
@EqualsAndHashCode(of = "name")
@Entity
@Table(schema = "world")
@RemoteEntity
public class Currency {
    @Id
    @SequenceGenerator(name = "currency_id_seq_gen", allocationSize = 1,
            schema = "world", sequenceName = "currency_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "currency_id_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;
    private @Min(0) float valueMultiplier;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(schema = "world")
    private Set<Nation> nations;
}
