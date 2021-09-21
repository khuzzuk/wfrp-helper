package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(schema = "rules")
@Audited
@DTO
public class Modifier extends BaseEntity {
    private @Min(-100) @Max(100) int value;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private @NotNull ModifierType type = ModifierType.REGULAR;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinTable(schema = "rules")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<DiceRoll> rolls = new ArrayList<>();
}
