package pl.khuzzuk.wfrp.helper.model.inventory;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.common.EnumType;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.money.Price;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode(of = "name")
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Item {
    @FormElement(exclude = true)
    @Id
    @SequenceGenerator(name = "item_seq_gen", sequenceName = "item_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3) String name;
    private String description;
    private @Min(0) float weight;
    @Embedded
    @FormElement(editor = EditorType.EMBEDDED)
    private Price price;
    @Type(type = EnumType.DEF)
    private @NotNull Accessibility accessibility = Accessibility.COMMON;

    @Override
    public String toString() {
        return name;
    }
}
