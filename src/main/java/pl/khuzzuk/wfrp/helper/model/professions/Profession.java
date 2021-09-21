package pl.khuzzuk.wfrp.helper.model.professions;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.common.StringArrayType;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(schema = "knowledge")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Profession extends BaseEntity {
    private @Length(min = 3, max = 64) String name;
    private String description;
    @ManyToOne
    private ProfessionClass professionClass;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinTable(schema = "knowledge")
    private List<Determinant> determinants;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(schema = "knowledge")
    private Set<Skill> skills;

    @Type(type = StringArrayType.DEF)
    private Set<String> nextProfessions;
}
