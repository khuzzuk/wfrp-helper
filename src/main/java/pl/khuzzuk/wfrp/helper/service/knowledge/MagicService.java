package pl.khuzzuk.wfrp.helper.service.knowledge;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchool;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolLevel;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolRepo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class MagicService {
    private SpellSchoolRepo spellSchoolRepo;

    public List<SpellSchoolLevel> getAvailableSpellSchools(CurrentMagicKnowledge currentMagicKnowledge) {
        List<SpellSchool> spellSchools = spellSchoolRepo.findAll();
        return spellSchools.stream()
                .filter(spellSchool -> isAvailable(spellSchool, currentMagicKnowledge))
                .map(spellSchool -> mapToRelevantSpellSchool(spellSchool, currentMagicKnowledge))
                .collect(Collectors.toList());
    }

    private static SpellSchoolLevel mapToRelevantSpellSchool(SpellSchool spellSchool, CurrentMagicKnowledge currentMagicKnowledge) {
        Optional<SpellSchoolLevel> currentSpellSchool = getSpellSchoolByType(currentMagicKnowledge, spellSchool);

        SpellSchoolLevel relevantLevel = new SpellSchoolLevel();
        relevantLevel.setSpellSchool(spellSchool);
        relevantLevel.setLevel(1);

        if (currentSpellSchool.isPresent()) {
            relevantLevel.setLevel(currentSpellSchool.get().getLevel() + 1);
        }

        return relevantLevel;
    }

    private static boolean isAvailable(SpellSchool spellSchool, CurrentMagicKnowledge currentMagicKnowledge) {
        Optional<SpellSchoolLevel> spellSchoolByType = getSpellSchoolByType(currentMagicKnowledge, spellSchool);
        if (spellSchoolByType.isPresent()) {
            return spellSchoolByType.get().getLevel() < spellSchool.getLevels();
        } else {
            return true;
        }
    }

    private static Optional<SpellSchoolLevel> getSpellSchoolByType(CurrentMagicKnowledge currentMagicKnowledge, SpellSchool spellSchool) {
        return currentMagicKnowledge.getCurrentSpellSchools().stream()
                .filter(sc -> sc.getSpellSchool().getName().equals(spellSchool.getName()))
                .findAny();
    }
}
