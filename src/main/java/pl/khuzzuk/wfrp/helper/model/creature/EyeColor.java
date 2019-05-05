package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Data
@EqualsAndHashCode(of = "name")
@Entity
@RemoteEntity
public class EyeColor {
    @Id
    @SequenceGenerator(name = "eye_color_seq_gen", sequenceName = "eye_color_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eye_color_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;

    @Override
    public String toString() {
        return name;
    }
}
