package pl.khuzzuk.wfrp.helper.service.knowledge;

import lombok.Getter;
import lombok.Setter;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolLevel;
import pl.khuzzuk.wfrp.helper.model.world.Realm;

import javax.validation.constraints.NotNull;
import java.util.List;

@DTO
@Getter
@Setter
public class CurrentMagicKnowledge {
    private List<SpellSchoolLevel> currentSpellSchools;
    private @NotNull Realm realm;
    private List<Skill> currentSkills;
}
