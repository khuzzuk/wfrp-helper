package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.common.EnumType;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;
import pl.khuzzuk.wfrp.helper.model.money.Price;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@EqualsAndHashCode(of = "name", callSuper = false)
@Entity
@Table(schema = "crafting")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Item extends BaseEntity {
    @Id
    @SequenceGenerator(name = "item_seq_gen", schema = "crafting", sequenceName = "item_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3) String name;
    private String description;
    private @Min(0) float weight;
    private Price price;
    @Type(type = EnumType.DEF)
    private @NotNull Availability availability = Availability.COMMON;

    @Override
    public String toString() {
        return name;
    }
}
