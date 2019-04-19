package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.remote.DTO;
import pl.khuzzuk.wfrp.helper.repo.ListableEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@DTO
@Entity
public class DiceRoll extends ListableEntity {
    @SequenceGenerator(name = "dice_roll_seq_gen", sequenceName = "dice_roll_seq", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dice_roll_seq_gen")
    private Long id;

    @Column(nullable = false)
    private @NotNull Dice dice;

    private @Min(1) @Max(10) int rolls;
}
