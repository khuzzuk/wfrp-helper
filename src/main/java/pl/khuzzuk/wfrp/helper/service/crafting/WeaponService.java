package pl.khuzzuk.wfrp.helper.service.crafting;

import org.springframework.stereotype.Service;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.rule.Dice;
import pl.khuzzuk.wfrp.helper.model.rule.DiceRoll;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;

import javax.transaction.Transactional;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WeaponService {
    @Transactional
    public String getDamage(MeleeWeapon weapon) {
        Modifier blueprintDamage = weapon.getType().getDamage();
        float strength = (weapon.getPrimaryResource() != null ? weapon.getPrimaryResource().getStrength() : 1) +
                (weapon.getSecondaryResource() != null ? weapon.getSecondaryResource().getStrength() : 0);

        List<String> rolls = blueprintDamage.getRolls().stream()
                .map(diceRoll -> mapDiceRoll(diceRoll, strength))
                .collect(Collectors.toList());

        int baseValue = blueprintDamage.getValue();
        if (baseValue > 0) {
            rolls.add(String.valueOf((int) (baseValue * strength)));
        }
        return rolls.stream().collect(Collectors.joining(" + "));
    }

    private static String mapDiceRoll(DiceRoll diceRoll, float multiplier) {
        Dice dice = diceRoll.getDice().multiplyDice(multiplier);
        return (diceRoll.getRolls() > 1 ? String.valueOf(diceRoll.getRolls()) : "")
                + dice;
    }
}
