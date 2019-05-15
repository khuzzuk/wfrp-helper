package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.common.EnumType;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@EqualsAndHashCode(of = "name")
@Entity
@RemoteEntity
public class ArmorPattern {
    @Id
    @SequenceGenerator(name = "armor_pattern_seq_gen", sequenceName = "armor_pattern_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "armor_pattern_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 500) String description;
    private float priceMultiplier = 1;
    private float weight;
    private float strength;
    @Type(type = EnumType.DEF)
    private @NotNull Availability availability = Availability.COMMON;
}
