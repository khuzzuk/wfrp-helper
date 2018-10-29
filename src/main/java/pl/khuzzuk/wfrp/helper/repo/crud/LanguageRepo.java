package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.world.Language;

public interface LanguageRepo extends JpaRepository<Language, Long> {
}
