package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;

public interface ProfessionClassRepo extends JpaRepository<ProfessionClass, Long> {
}
