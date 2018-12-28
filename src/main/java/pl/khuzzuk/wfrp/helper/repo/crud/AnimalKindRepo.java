package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.creature.AnimalKind;

public interface AnimalKindRepo extends JpaRepository<AnimalKind, Long> {
}
