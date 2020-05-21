package pl.khuzzuk.wfrp.helper.model.money;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;
import pl.javahello.DTO;

import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode(of = "currency")
@Entity
@Table(schema = "creature")
@Audited
@DTO
public class Money {
    @Id
    @SequenceGenerator(name = "money_id_seq_gen", allocationSize = 1,
            schema = "creature", sequenceName = "money_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "money_id_seq_gen")
    private Long id;
    @ManyToOne
    @JoinColumn
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Currency currency;
    private Price amount;
}
