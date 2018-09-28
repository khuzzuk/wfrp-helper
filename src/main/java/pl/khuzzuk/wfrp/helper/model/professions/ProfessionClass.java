package pl.khuzzuk.wfrp.helper.model.professions;

import lombok.Data;
import pl.khuzzuk.wfrp.helper.edit.FormElement;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Data
@Entity
public class ProfessionClass {
    @Id
    @GeneratedValue
    @FormElement(exclude = true)
    private Long id;
    private String name;
    private String description;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER, mappedBy = "professionClass")
    private Set<Profession> professions;
}
