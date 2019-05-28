package pl.khuzzuk.wfrp.helper.service.determinant;

import org.springframework.stereotype.Service;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;
import pl.khuzzuk.wfrp.helper.model.rule.ModifierType;
import pl.khuzzuk.wfrp.helper.model.rule.ValueType;

import java.util.Optional;

@Service
public class ModifierService {
    public Modifier getExperienceExtensionModifier(ValueType valueType) {
        Modifier modifier = new Modifier();
        modifier.setType(ModifierType.EXPERIENCE);
        modifier.setValue(valueType == ValueType.PERCENTAGE ? 10 : 1);
        return modifier;
    }

    public Modifier getOrCreateRegularModifier(Determinant determinant) {
        Optional<Modifier> queryResult = determinant.getModifiers().stream()
                .filter(modifier -> modifier.getType().equals(ModifierType.REGULAR))
                .findFirst();

        Modifier regularModifier = queryResult.orElseGet(ModifierService::createBaseModifier);
        if (queryResult.isEmpty()) {
            determinant.getModifiers().add(regularModifier);
        }

        return regularModifier;
    }

    private static Modifier createBaseModifier() {
        Modifier modifier = new Modifier();
        modifier.setType(ModifierType.REGULAR);
        return modifier;
    }
}
