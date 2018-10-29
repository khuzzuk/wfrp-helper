package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.creature.PhysicalFeature;

public interface PhysicalFeatureRepo extends JpaRepository<PhysicalFeature, Long> {
}
