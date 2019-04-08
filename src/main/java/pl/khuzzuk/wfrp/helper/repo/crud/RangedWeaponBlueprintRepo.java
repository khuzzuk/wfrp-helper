package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints.RangedWeaponBlueprint;

public interface RangedWeaponBlueprintRepo extends JpaRepository<RangedWeaponBlueprint, Long> {
}
