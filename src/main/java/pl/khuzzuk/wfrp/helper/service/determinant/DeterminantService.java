package pl.khuzzuk.wfrp.helper.service.determinant;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.khuzzuk.wfrp.helper.model.creature.CreatureDeterminants;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.model.rule.DeterminantType;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;
import pl.khuzzuk.wfrp.helper.model.rule.ModifierType;

@AllArgsConstructor
@Service
public class DeterminantService {

  private ModifierService modifierService;

  Determinant resolveRolls(Determinant determinant) {
    Determinant resolved = new Determinant();
    resolved.setType(determinant.getType());

    int value = determinant.getValue();
    int modifiers = sumModifierValuesValue(determinant);
    int rolls =
        determinant.getModifiers().stream().mapToInt(modifierService::roll).reduce(0, Integer::sum);
    resolved.setValue(value + modifiers + rolls);

    return resolved;
  }

  int sumModifierValuesValue(Determinant determinant) {
    int result = determinant.getValue();
    for (Modifier m : determinant.getModifiers()) {
      result += m.getValue();
    }
    return result;
  }

  Determinant findDeterminantByType(CreatureDeterminants creatureDeterminants,
                                    DeterminantType determinantType) {
    Optional<Determinant> queryResult =
        findDeterminant(creatureDeterminants.getDeterminants(), determinantType);
    Determinant determinant = queryResult.orElseGet(() -> createEmpty(determinantType));
    if (queryResult.isEmpty()) {
      creatureDeterminants.getDeterminants().add(determinant);
    }
    return determinant;
  }

  private static Optional<Determinant> findDeterminant(Collection<Determinant> determinants,
                                                       DeterminantType determinantType) {
    return determinants.stream()
                       .filter(determinant -> determinant.getType().equals(determinantType))
                       .findAny();
  }

  private static Determinant createEmpty(DeterminantType determinantType) {
    Determinant determinant = new Determinant();
    determinant.setType(determinantType);
    determinant.setModifiers(new ArrayList<>());
    return determinant;
  }

  Determinant addExperienceExtension(Determinant determinant) {
    normalizeDeterminant(determinant);

    int currentExtensions = sumCurrentExtensions(determinant);
    int extensionsLimit = getProfessionExtensionsLimit(determinant);

    if (currentExtensions < extensionsLimit) {
      Modifier experienceExtensionModifier =
          modifierService.getExperienceExtensionModifier(determinant.getType().getValueType());
      determinant.getModifiers().add(experienceExtensionModifier);
    }

    return determinant;
  }

  private static void normalizeDeterminant(Determinant determinant) {
    if (determinant.getModifiers() == null) {
      determinant.setModifiers(new ArrayList<>());
    }
  }

  private int sumCurrentExtensions(Determinant determinant) {
    return determinant.getModifiers()
                      .stream()
                      .filter(modifier -> modifier.getType().equals(ModifierType.EXPERIENCE))
                      .mapToInt(Modifier::getValue)
                      .sum();
  }

  private int getProfessionExtensionsLimit(Determinant determinant) {
    return determinant.getModifiers()
                      .stream()
                      .filter(modifier -> modifier.getType().equals(ModifierType.PROFESSION))
                      .mapToInt(Modifier::getValue)
                      .sum();
  }

  Determinant removeExperienceExtension(Determinant determinant) {
    normalizeDeterminant(determinant);
    List<Modifier> modifiers = determinant.getModifiers();
    modifiers.stream()
             .filter(modifier -> ModifierType.EXPERIENCE == modifier.getType())
             .findAny()
             .ifPresent(modifiers::remove);
    return determinant;
  }
}
