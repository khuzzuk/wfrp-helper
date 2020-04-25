package pl.khuzzuk.wfrp.helper.multimedia;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.DTO;

@Data
@EqualsAndHashCode(of = "id")
@Entity
@Table(schema = "multimedia")
@DTO
public class Picture {
  @Id
  @SequenceGenerator(name = "picture_seq_gen",
                     schema = "multimedia",
                     sequenceName = "picture_id_seq",
                     allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "picture_seq_gen")
  private Long id;
  private @Length(min = 3, max = 100) String name;
  @Lob
  @Column(columnDefinition = "LO")
  private byte[] image;
}
