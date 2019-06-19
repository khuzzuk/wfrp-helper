package pl.khuzzuk.wfrp.helper.service.knowledge;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.khuzzuk.remote.Adapter;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolLevel;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolLevelDTO;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("magic")
public class MagicRemoteService {
    private MagicService magicService;
    private Adapter<CurrentMagicKnowledgeDTO, CurrentMagicKnowledge> currentMagicKnowledgeAdapter;
    private Adapter<SpellSchoolLevel, SpellSchoolLevelDTO> spellSchoolLevelDTOAdapter;

    @Transactional
    @RequestMapping("getAvailableSpellSchools")
    public List<SpellSchoolLevelDTO> getAvailableSpellSchools(@RequestBody CurrentMagicKnowledgeDTO currentSpellSchools) {
        CurrentMagicKnowledge currentMagicKnowledge = currentMagicKnowledgeAdapter.map(currentSpellSchools);
        List<SpellSchoolLevel> availableSpellSchools = magicService.getAvailableSpellSchools(currentMagicKnowledge);
        return spellSchoolLevelDTOAdapter.list(availableSpellSchools);
    }
}
