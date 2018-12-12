package pl.khuzzuk.wfrp.helper.service.determinant;

import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.model.rule.Modifier;
import pl.khuzzuk.wfrp.helper.model.rule.ModifierType;

import java.util.Optional;

@Component
public class ModifierService {

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
