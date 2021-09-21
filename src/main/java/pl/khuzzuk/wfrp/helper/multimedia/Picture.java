package pl.khuzzuk.wfrp.helper.multimedia;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.model.world.Place;

import javax.persistence.*;

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
  @ManyToOne
  private Place place;
  @Lob
  @Column(columnDefinition = "LO")
  private byte[] image;
}
