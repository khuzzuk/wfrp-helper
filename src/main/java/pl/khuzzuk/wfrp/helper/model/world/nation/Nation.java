package pl.khuzzuk.wfrp.helper.model.world.nation;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.repo.ListableEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Getter
@Setter
@Entity
public class Nation extends ListableEntity {
    @Id
    @SequenceGenerator(name = "nation_seq_gen", sequenceName = "nation_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "nation_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 50_000) String description;
}
