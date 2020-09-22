package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import java.util.Set;

@Getter
@Setter
@EqualsAndHashCode(of = "name")
@Entity
@RemoteEntity(transactional = true)
@SecuredService(allowRead = true)
public class Animal extends BaseEntity {
    @Id
    @SequenceGenerator(name = "animal_seq_gen", sequenceName = "animal_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "animal_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;
    @ManyToOne(fetch = FetchType.EAGER)
    private AnimalKind animalKind;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Determinant> determinants;
}
