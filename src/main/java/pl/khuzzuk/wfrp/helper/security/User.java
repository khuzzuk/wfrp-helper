package pl.khuzzuk.wfrp.helper.security;

import lombok.Data;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
@Entity
@Table(schema = "security")
public class User {
    @Id
    @SequenceGenerator(name = "user_seq_gen", sequenceName = "user_seq", schema = "security")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
    @FormElement(exclude = true)
    private Long id;
    @NaturalId
    @Filter
    private @Length(min = 3, max = 100) String name;
    @FormElement(exclude = true)
    private @NotNull String password;
    private boolean oneTimePassword = true;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(schema = "security")
    @FormElement(editor = EditorType.CHOOSE)
    private Set<Role> roles;
}
