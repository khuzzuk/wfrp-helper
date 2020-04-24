package pl.khuzzuk.wfrp.helper.service.knowledge;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchool;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolLevel;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolRepo;

@AllArgsConstructor
@Service
public class MagicService {

  private SpellSchoolRepo spellSchoolRepo;

  public List<SpellSchoolLevel> getAvailableSpellSchools(CurrentMagicKnowledge currentMagicKnowledge) {
    List<SpellSchool> spellSchools = spellSchoolRepo.findAll();
    List<SpellSchool> realmSchools = currentMagicKnowledge.getRealm().getSpellSchools();
    return spellSchools.stream()
        .filter(realmSchools::contains)
        .filter(spellSchool -> isAvailable(spellSchool, currentMagicKnowledge))
        .map(spellSchool -> mapToRelevantSpellSchool(spellSchool, currentMagicKnowledge))
        .collect(Collectors.toList());
  }

  private static boolean isAvailable(SpellSchool spellSchool,
                                     CurrentMagicKnowledge currentMagicKnowledge) {
    Optional<SpellSchoolLevel> spellSchoolByType = getSpellSchoolByType(currentMagicKnowledge,
                                                                        spellSchool);
    return spellSchoolByType.map(spellSchoolLevel -> spellSchoolLevel.getLevel() <
                                                     spellSchool.getLevels()).orElse(true);
  }

  private static SpellSchoolLevel mapToRelevantSpellSchool(SpellSchool spellSchool,
                                                           CurrentMagicKnowledge currentMagicKnowledge) {
    Optional<SpellSchoolLevel> currentSpellSchool = getSpellSchoolByType(currentMagicKnowledge,
                                                                         spellSchool);

    SpellSchoolLevel relevantLevel = new SpellSchoolLevel();
    relevantLevel.setSpellSchool(spellSchool);
    relevantLevel.setLevel(1);

    currentSpellSchool.ifPresent(spellSchoolLevel -> relevantLevel.setLevel(spellSchoolLevel.getLevel() +
                                                                            1));

    return relevantLevel;
  }

  private static Optional<SpellSchoolLevel> getSpellSchoolByType(CurrentMagicKnowledge currentMagicKnowledge,
                                                                 SpellSchool spellSchool) {
    return currentMagicKnowledge.getCurrentSpellSchools()
        .stream()
        .filter(sc -> sc.getSpellSchool().getName().equals(spellSchool.getName()))
        .findAny();
  }
}
