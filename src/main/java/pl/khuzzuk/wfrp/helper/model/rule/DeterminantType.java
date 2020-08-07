package pl.khuzzuk.wfrp.helper.model.rule;

import static pl.khuzzuk.wfrp.helper.model.rule.ValueType.PERCENTAGE;
import static pl.khuzzuk.wfrp.helper.model.rule.ValueType.REGULAR;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum DeterminantType {
    SPEED(REGULAR),
    BATTLE(PERCENTAGE),
    SHOOTING(PERCENTAGE),
    STRENGTH(REGULAR),
    DURABILITY(REGULAR),
    HEALTH(REGULAR),
    INITIATIVE(PERCENTAGE),
    ATTACK(REGULAR),
    DEXTERITY(PERCENTAGE),
    LEADER_SKILLS(PERCENTAGE),
    INTELLIGENCE(PERCENTAGE),
    CONTROL(PERCENTAGE),
    WILL(PERCENTAGE),
    CHARISMA(PERCENTAGE),
    PARRY(PERCENTAGE),
    OPPONENT_PARRY(PERCENTAGE);

    private ValueType valueType;
}
