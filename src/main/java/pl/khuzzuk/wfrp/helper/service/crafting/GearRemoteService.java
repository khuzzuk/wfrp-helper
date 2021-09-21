package pl.khuzzuk.wfrp.helper.service.crafting;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.ArmorRepo;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeaponRepo;
import pl.khuzzuk.wfrp.helper.model.rule.Placement;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("gear")
public class GearRemoteService {
    private MeleeWeaponRepo meleeWeaponRepo;
    private ArmorRepo armorRepo;
    private GearService gearService;

    @GetMapping("getMeleeWeaponDamage/{id}")
    @Transactional
    public String getMeleeWeaponDamage(@PathVariable("id") long id) {
        MeleeWeapon weapon = meleeWeaponRepo.getOne(id);
        return gearService.getDamage(weapon);
    }

    @GetMapping("getArmorValue/{id}")
    @Transactional
    public String getArmorValue(@PathVariable("id") long id) {
        Armor armor = armorRepo.getOne(id);
        return String.valueOf(gearService.getArmor(armor));
    }

    @RequestMapping("getArmorValuesForGear")
    @Transactional
    public Map<Placement, Integer> getArmorValuesForGear(@RequestBody List<Long> armorIds) {
        List<Armor> armors = armorIds.stream()
                .map(armorRepo::getOne)
                .collect(Collectors.toList());
        return gearService.getArmorValuesForGear(armors);
    }
}
