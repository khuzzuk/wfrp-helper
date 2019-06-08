package pl.khuzzuk.wfrp.helper.service.crafting;

import org.springframework.stereotype.Service;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.crafting.resource.Resource;
import pl.khuzzuk.wfrp.helper.model.rule.Dice;
import pl.khuzzuk.wfrp.helper.model.rule.DiceRoll;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GearService {
    @Transactional
    public String getDamage(MeleeWeapon weapon) {
        Modifier blueprintDamage = weapon.getType().getDamage();
        float strength = calculateResourceStrength(weapon.getPrimaryResource(), weapon.getSecondaryResource());

        List<String> rolls = blueprintDamage.getRolls().stream()
                .map(diceRoll -> mapDiceRoll(diceRoll, strength))
                .collect(Collectors.toList());

        int baseValue = blueprintDamage.getValue();
        if (baseValue > 0) {
            rolls.add(String.valueOf((int) (baseValue * strength)));
        }
        return rolls.stream().collect(Collectors.joining(" + "));
    }

    @Transactional
    public String getArmor(Armor armor) {
        float strength = calculateResourceStrength(armor.getPrimaryResource(), armor.getSecondaryResource());
        float patternStrength = armor.getArmorPattern().getStrength();

        float totalArmorValue = armor.getType().getArmor() * strength * patternStrength;
        return String.valueOf(Math.round(totalArmorValue));
    }

    private static float calculateResourceStrength(Resource primaryResource, Resource secondaryResource) {
        return (primaryResource != null ? primaryResource.getStrength() : 1)
                + ((secondaryResource != null ? secondaryResource.getStrength() : 0) / 10);
    }

    private static String mapDiceRoll(DiceRoll diceRoll, float multiplier) {
        Dice dice = diceRoll.getDice().multiplyDice(multiplier);
        return (diceRoll.getRolls() > 1 ? String.valueOf(diceRoll.getRolls()) : "")
                + dice;
    }
}
