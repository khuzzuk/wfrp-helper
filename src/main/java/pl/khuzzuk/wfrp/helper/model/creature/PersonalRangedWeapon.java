package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Ammunition;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.RangedWeapon;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(schema = "creature", name = "person_ranged_weapons")
@Audited
@DTO
public class PersonalRangedWeapon extends BaseEntity {
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
