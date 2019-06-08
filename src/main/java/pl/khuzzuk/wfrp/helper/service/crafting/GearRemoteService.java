package pl.khuzzuk.wfrp.helper.service.crafting;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.ArmorRepo;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeaponRepo;

import javax.transaction.Transactional;

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
        return gearService.getArmor(armor);
    }
}
