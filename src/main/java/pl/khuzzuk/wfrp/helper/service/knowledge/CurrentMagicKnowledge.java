package pl.khuzzuk.wfrp.helper.service.knowledge;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolLevel;

import java.util.List;
import pl.khuzzuk.wfrp.helper.model.world.Realm;

@DTO
@Getter
@Setter
public class CurrentMagicKnowledge {
    private List<SpellSchoolLevel> currentSpellSchools;
    private @NotNull Realm realm;
    private List<Skill> currentSkills;
}
