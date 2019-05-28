package pl.khuzzuk.wfrp.helper.service.determinant;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.khuzzuk.wfrp.helper.model.creature.PersonDeterminants;
import pl.khuzzuk.wfrp.helper.model.rule.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class DeterminantService {
    private ModifierService modifierService;

    public Determinant findDeterminantByType(PersonDeterminants personDeterminants, DeterminantType determinantType) {
        Optional<Determinant> queryResult = findDeterminant(personDeterminants.getDeterminants(), determinantType);
        Determinant determinant = queryResult.orElseGet(() -> createEmpty(determinantType));
        if (queryResult.isEmpty()) {
            personDeterminants.getDeterminants().add(determinant);
        }
        return determinant;
    }

    public int calculateFinalValue(Determinant determinant) {
        int result = determinant.getValue();
        for (Modifier m : determinant.getModifiers()) {
            result += m.getValue();
        }
        return result;
    }

    public int getProfessionExtensionsLimit(Determinant determinant) {
        return determinant.getModifiers().stream()
                .filter(modifier -> modifier.getType().equals(ModifierType.PROFESSION))
                .mapToInt(Modifier::getValue)
                .sum();
    }

    private int sumCurrentExtensions(Determinant determinant) {
        return determinant.getModifiers().stream()
                .filter(modifier -> modifier.getType().equals(ModifierType.EXPERIENCE))
                .mapToInt(Modifier::getValue)
                .sum();
    }

    private static Optional<Determinant> findDeterminant(Collection<Determinant> determinants, DeterminantType determinantType) {
        return determinants.stream().filter(determinant -> determinant.getType().equals(determinantType)).findAny();
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
            Modifier experienceExtensionModifier = modifierService.getExperienceExtensionModifier(determinant.getType().getValueType());
            determinant.getModifiers().add(experienceExtensionModifier);
        }

        return determinant;
    }

    private static void normalizeDeterminant(Determinant determinant) {
        if (determinant.getModifiers() == null) {
            determinant.setModifiers(new ArrayList<>());
        }
    }
}
