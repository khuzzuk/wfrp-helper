package pl.khuzzuk.wfrp.helper.model.inventory;

import lombok.Data;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.money.Price;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.Min;

@Data
@Entity
public class Item {
    @FormElement(exclude = true)
    @Id
    @SequenceGenerator(name = "item_seq_gen", sequenceName = "item_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3) String name;
    private String description;
    private @Min(0) float weight;
    @Embedded
    @FormElement(editor = EditorType.EMBEDDED)
    private Price price;

    @Override
    public String toString() {
        return name;
    }
}
