package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.creature.HairColor;

public interface HairColorRepo extends JpaRepository<HairColor, Long> {
}
