package pl.khuzzuk.wfrp.helper.model.knowledge.magic;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;
import pl.khuzzuk.remote.DTO;
import pl.khuzzuk.wfrp.helper.repo.ListableEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Getter
@Setter
@Audited
@Entity
@Table(schema = "creature", name = "person_spell_school_level")
@DTO
public class SpellSchoolLevel extends ListableEntity {
    @SequenceGenerator(name = "person_spell_school_level_id_seq", schema = "creature", sequenceName = "person_spell_school_level_id_seq")
    @GeneratedValue(generator = "person_spell_school_level_id_seq", strategy = GenerationType.SEQUENCE)
    @Id
    private Long id;
    @ManyToOne
    @JoinColumn(name = "spell_school_id")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private SpellSchool spellSchool;
    private int level;
}
