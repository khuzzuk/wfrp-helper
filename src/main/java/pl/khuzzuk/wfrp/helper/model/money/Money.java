package pl.khuzzuk.wfrp.helper.model.money;

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
@Entity
@Table(schema = "creature")
@Audited
@DTO
public class Money extends BaseEntity {
    @ManyToOne
    @JoinColumn
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Currency currency;
    private Price amount;
}
