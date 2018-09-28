package pl.khuzzuk.wfrp.helper.ui.crud;

import lombok.experimental.UtilityClass;
import pl.khuzzuk.wfrp.helper.edit.FormElement;

import java.lang.reflect.Field;
import java.util.Set;

@UtilityClass
class ExclusionFieldsUtils {
    private static final Set<Class<?>> supportedTypes = Set.of(
            String.class,
            int.class, Integer.class
    );

    static boolean canIncludeInForm(Field field) {
        if (Enum.class.isAssignableFrom(field.getType())) {
            return true;
        }

        if (!field.isAnnotationPresent(FormElement.class)) {
            return supportedTypes.contains(field.getType());
        }

        FormElement metadata = field.getDeclaredAnnotation(FormElement.class);
        return !metadata.exclude();
    }
}
