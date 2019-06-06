package pl.khuzzuk.wfrp.helper.service.crafting;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeaponRepo;

import javax.transaction.Transactional;

@AllArgsConstructor
@RestController
@RequestMapping("weapon")
public class WeaponRemoteService {
    private MeleeWeaponRepo meleeWeaponRepo;
    private WeaponService weaponService;

    @GetMapping("getMeleeWeaponDamage/{id}")
    @Transactional
    public String getMeleeWeaponDamage(@PathVariable("id") long id) {
        MeleeWeapon weapon = meleeWeaponRepo.getOne(id);
        return weaponService.getDamage(weapon);
    }
}
