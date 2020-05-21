package pl.khuzzuk.wfrp.helper.model.knowledge.magic;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;

@Data
@EqualsAndHashCode(of = "name")
@Entity
@Table(schema = "magic")
@RemoteEntity
public class SpellSchool {

  @Id
  @SequenceGenerator(name = "spell_school_seq_gen",
                     schema = "magic",
                     sequenceName = "spell_school_id_seq",
                     allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "spell_school_seq_gen")
  private Long id;
  @NaturalId
  private @Length(min = 3, max = 64) String name;
  private @Length(max = 500) String description;
  private @Min(1) @Max(99) int levels = 1;

  @Override
  public String toString() {
    return name;
  }
}
