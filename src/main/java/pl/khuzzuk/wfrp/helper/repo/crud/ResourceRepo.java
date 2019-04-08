package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.crafting.resource.Resource;

public interface ResourceRepo extends JpaRepository<Resource, Long> {
}
