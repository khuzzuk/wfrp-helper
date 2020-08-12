package pl.khuzzuk.wfrp.helper.service.crafting;

import org.springframework.stereotype.Service;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.crafting.resource.Resource;
import pl.khuzzuk.wfrp.helper.model.rule.Dice;
import pl.khuzzuk.wfrp.helper.model.rule.DiceRoll;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

import javax.transaction.Transactional;
import java.util.*;
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
    public int getArmor(Armor armor) {
        float strength = calculateResourceDurability(armor.getPrimaryResource(), armor.getSecondaryResource());
        float patternStrength = armor.getArmorPattern().getStrength();

        float totalArmorValue = armor.getType().getArmor() * (strength + patternStrength);
        return Math.round(totalArmorValue);
    }

    public Map<Placement, Integer> getArmorValuesForGear(List<Armor> armors) {
        Map<Placement, Integer> values = new EnumMap<>(Placement.class);
        Arrays.stream(Placement.values()).forEach(placement -> values.put(placement, 0));

        for (Armor armor : armors) {
            for (Placement placement : armor.getType().getPlacement()) {
                values.put(placement, values.get(placement) + getArmor(armor));
            }
        }

        return values;
    }

    private static float calculateResourceStrength(Resource primaryResource, Resource secondaryResource) {
        return (primaryResource != null ? primaryResource.getStrength() : 1)
                + ((secondaryResource != null ? secondaryResource.getStrength() : 0) / 10);
    }

    private static float calculateResourceDurability(Resource primaryResource, Resource secondaryResource) {
        return (primaryResource != null ? primaryResource.getDurability() : 1)
                + ((secondaryResource != null ? secondaryResource.getDurability() : 0) / 10);
    }

    private static String mapDiceRoll(DiceRoll diceRoll, float multiplier) {
        Dice dice = diceRoll.getDice().multiplyDice(multiplier);
        return (diceRoll.getRolls() > 1 ? String.valueOf(diceRoll.getRolls()) : "")
                + dice;
    }
}
