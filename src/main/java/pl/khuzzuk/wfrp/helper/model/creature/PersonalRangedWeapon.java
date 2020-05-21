package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Ammunition;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.RangedWeapon;
import pl.khuzzuk.wfrp.helper.repo.ListableEntity;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(schema = "creature", name = "person_ranged_weapons")
@Audited
@DTO
public class PersonalRangedWeapon extends ListableEntity {
    @Id
    @SequenceGenerator(name = "person_ranged_weapon_seq_gen", schema = "creature", sequenceName = "person_ranged_weapons_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_seq_gen")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "ranged_weapon_id")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private RangedWeapon rangedWeapon;
    @ManyToOne
    @JoinColumn(name = "ammunition_id")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Ammunition ammunition;
    private int ammunitionAmount;
}
