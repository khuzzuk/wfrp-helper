package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;
import pl.khuzzuk.remote.DTO;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(of = {"id", "type"})
@Entity
@Audited
@DTO
public class Modifier {
    @Id
    @SequenceGenerator(name = "modifier_seq_gen", sequenceName = "modifier_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "modifier_seq_gen")
    private Long id;

    private @Min(-100) @Max(100) int value;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private @NotNull ModifierType type = ModifierType.REGULAR;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<DiceRoll> rolls = new ArrayList<>();

    @Override
    public String toString() {
        return (rolls.isEmpty() ? ""
                : rolls.stream().map(Object::toString).collect(Collectors.joining("+"))) + "+"
                + value;
    }
}
