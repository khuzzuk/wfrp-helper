package pl.khuzzuk.wfrp.helper.service.determinant;

import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.model.creature.PersonDeterminants;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.model.rule.DeterminantType;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;
import pl.khuzzuk.wfrp.helper.model.rule.ModifierType;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;

@Component
public class DeterminantService {
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

    private static Optional<Determinant> findDeterminant(Collection<Determinant> determinants, DeterminantType determinantType) {
        return determinants.stream().filter(determinant -> determinant.getType().equals(determinantType)).findAny();
    }

    private static Determinant createEmpty(DeterminantType determinantType) {
        Determinant determinant = new Determinant();
        determinant.setType(determinantType);
        determinant.setModifiers(new ArrayList<>());
        return determinant;
    }
}
