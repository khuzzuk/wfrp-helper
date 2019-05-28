package pl.khuzzuk.wfrp.helper.model.rule;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static pl.khuzzuk.wfrp.helper.model.rule.ValueType.PERCENTAGE;
import static pl.khuzzuk.wfrp.helper.model.rule.ValueType.REGULAR;

@AllArgsConstructor
@Getter
public enum DeterminantType {
    SPEED(REGULAR),
    BATTLE(PERCENTAGE),
    SHOOTING(PERCENTAGE),
    STRENGTH(REGULAR),
    DURABILITY(PERCENTAGE),
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
