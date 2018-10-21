package pl.khuzzuk.wfrp.helper.model.resource;

import lombok.Data;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.inventory.Accessibility;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Resource {
    @Id
    @SequenceGenerator(name = "resource_seq_gen", sequenceName = "resource_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "resource_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    @Filter
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 500) String description;
    private float priceMultiplier = 1;
    private float weight;
    private float strength;
    private @NotNull Accessibility accessibility = Accessibility.COMMON;
}
