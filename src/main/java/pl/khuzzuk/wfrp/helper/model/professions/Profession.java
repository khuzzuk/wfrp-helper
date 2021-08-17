package pl.khuzzuk.wfrp.helper.model.professions;

import java.util.List;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.common.StringArrayType;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.repo.ListableBaseEntity;

@Getter
@Setter
@Entity
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Profession extends ListableBaseEntity {
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
