package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;
import pl.javahello.DTO;

import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode(of = {"item"})
@Entity
@Table(schema = "creature")
@Audited
@DTO
public class Inventory {
    @Id
    @SequenceGenerator(name = "inventory_seq_gen", schema = "creature", sequenceName = "inventory_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inventory_seq_gen")
    private Long id;
    @ManyToOne
    @JoinColumn
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private MiscItem item;
    private float amount;
}
