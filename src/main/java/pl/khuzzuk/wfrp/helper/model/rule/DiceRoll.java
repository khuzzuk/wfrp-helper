package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.common.EnumType;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@DTO
@Entity
@Table(schema = "rules")
public class DiceRoll extends BaseEntity {
    @Column(nullable = false)
    @Type(type = EnumType.DEF)
    private @NotNull Dice dice;

    private @Min(1) @Max(10) int rolls;
}
