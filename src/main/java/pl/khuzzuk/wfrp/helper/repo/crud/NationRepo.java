package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.world.Nation;

public interface NationRepo extends JpaRepository<Nation, Long> {
}
