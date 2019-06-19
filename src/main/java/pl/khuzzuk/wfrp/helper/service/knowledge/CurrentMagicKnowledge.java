package pl.khuzzuk.wfrp.helper.service.knowledge;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.remote.DTO;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolLevel;

import java.util.List;

@DTO
@Getter
@Setter
public class CurrentMagicKnowledge {
    private List<SpellSchoolLevel> currentSpellSchools;
    private List<Skill> currentSkills;
}
