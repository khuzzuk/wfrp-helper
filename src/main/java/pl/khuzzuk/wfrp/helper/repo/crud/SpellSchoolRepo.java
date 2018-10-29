package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.magic.SpellSchool;

public interface SpellSchoolRepo extends JpaRepository<SpellSchool, Long> {
}
