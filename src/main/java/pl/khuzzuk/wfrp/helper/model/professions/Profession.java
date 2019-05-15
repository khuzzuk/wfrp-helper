package pl.khuzzuk.wfrp.helper.model.professions;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.common.StringArrayType;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.repo.ListableEntity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@RemoteEntity
public class Profession extends ListableEntity {
    @Id
    @SequenceGenerator(name = "profession_seq_gen", sequenceName = "profession_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profession_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 64) String name;
    private String description;
    @ManyToOne
    private ProfessionClass professionClass;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Determinant> determinants;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Skill> skills;

    @Type(type = StringArrayType.DEF)
    private Set<String> nextProfessions;
}
