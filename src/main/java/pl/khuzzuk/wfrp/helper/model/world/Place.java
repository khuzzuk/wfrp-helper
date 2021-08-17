package pl.khuzzuk.wfrp.helper.model.world;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

@Data
@EqualsAndHashCode(of = {"name"}, callSuper = false)
@Entity
@Table(schema = "world")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Place extends BaseEntity {

  @Id
  @SequenceGenerator(name = "place_seq_gen",
                     schema = "world",
                     sequenceName = "place_id_seq",
                     allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "place_seq_gen")
  private Long id;
  @NaturalId
  private @Length(min = 3, max = 64) String name;
  private @Length(max = 5000) String description;
  @ManyToOne
  private @NotNull Nation nation;
}
