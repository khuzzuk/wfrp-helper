package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;

public interface ProfessionRepo extends JpaRepository<Profession, Long> {
}
