package pl.khuzzuk.wfrp.helper.model.professions;

import lombok.Data;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.FormElement;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Data
@Entity
public class Profession {
    @Id
    @GeneratedValue
    @FormElement(exclude = true)
    private Long id;
    private String name;
    private String description;
    @ManyToOne
    @FormElement(editor = EditorType.CHOOSE)
    private ProfessionClass professionClass;

    @Override
    public String toString() {
        return name;
    }
}
