package pl.khuzzuk.wfrp.helper.repo;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.*;
import org.hibernate.id.enhanced.SequenceStyleGenerator;
import pl.khuzzuk.wfrp.helper.common.UUIDType;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.UUID;

@Getter
@Setter
@EqualsAndHashCode(of = "uuid")
@MappedSuperclass
public abstract class BaseEntity {
  private static final String SEQ_GEN = "bigserial";

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ_GEN)
  @GenericGenerator(
          name = SEQ_GEN,
          strategy = "pl.khuzzuk.wfrp.helper.common.BigSerialSequenceGenerator",
          parameters = {
                  @Parameter(name = SequenceStyleGenerator.CONFIG_PREFER_SEQUENCE_PER_ENTITY, value = "true"),
                  @Parameter(name = SequenceStyleGenerator.CONFIG_SEQUENCE_PER_ENTITY_SUFFIX, value = "_id_seq"),
                  @Parameter(name = SequenceStyleGenerator.INITIAL_PARAM, value = "1"),
                  @Parameter(name = SequenceStyleGenerator.INCREMENT_PARAM, value = "1"),
          }
  )
  private Long id;

  @Type(type = UUIDType.DEF)
  private UUID uuid = UUID.randomUUID();

  @Version
  private int version;

  @UpdateTimestamp
  private ZonedDateTime lastUpdated;

  @CreationTimestamp
  private ZonedDateTime created;
}
