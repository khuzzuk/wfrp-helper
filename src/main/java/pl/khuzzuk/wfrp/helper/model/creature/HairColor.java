package pl.khuzzuk.wfrp.helper.model.creature;

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
public class HairColor {
    @Id
    @SequenceGenerator(name = "hair_color_seq_gen", sequenceName = "hair_color_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hair_color_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;

    @Override
    public String toString() {
        return name;
    }
}
