package pl.khuzzuk.wfrp.helper.security;

import lombok.Data;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Data
@Entity
@Table(schema = "security")
public class Role {
    @Id
    @SequenceGenerator(name = "role_seq_gen", sequenceName = "role_seq", schema = "security")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    @Filter
    private @Length(min = 3, max = 100) String name;
}
