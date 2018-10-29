package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.creature.Person;

public interface PersonRepo extends JpaRepository<Person, Long> {
}
