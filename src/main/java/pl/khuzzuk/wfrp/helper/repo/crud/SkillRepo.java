package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;

@Transactional
public interface SkillRepo extends JpaRepository<Skill, Long> {
}
