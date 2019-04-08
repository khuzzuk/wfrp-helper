package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.RangedWeapon;

public interface RangedWeaponRepo extends JpaRepository<RangedWeapon, Long> {
}
