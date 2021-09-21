package pl.khuzzuk.wfrp.helper.model.knowledge.magic;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@Audited
@Entity
@Table(schema = "creature", name = "person_spell_school_level")
@DTO
public class SpellSchoolLevel extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "spell_school_id")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private SpellSchool spellSchool;
    private int level;
}
