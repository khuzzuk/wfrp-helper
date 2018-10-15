package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.inventory.weapons.WeaponBlueprint;

public interface WeaponRepository extends JpaRepository<WeaponBlueprint, Long> {
}
