package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.inventory.Item;
import pl.khuzzuk.wfrp.helper.model.inventory.MiscItem;

public interface MiscItemRepo extends JpaRepository<MiscItem, Long> {
}
