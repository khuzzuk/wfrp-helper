package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.Spell;

public interface SpellRepo extends JpaRepository<Spell, Long> {
}
