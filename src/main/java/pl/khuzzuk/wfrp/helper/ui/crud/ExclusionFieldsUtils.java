package pl.khuzzuk.wfrp.helper.ui.crud;

import lombok.experimental.UtilityClass;

import javax.persistence.Id;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.Set;

@UtilityClass
class ExclusionFieldsUtils {
    private static final Set<Class<? extends Annotation>> excludedFieldAnnotations = Set.of(Id.class);

    static boolean isFieldExcluded(Field field) {
        return excludedFieldAnnotations.stream().anyMatch(field::isAnnotationPresent);
    }

    static boolean canIncludeInForm(Field field) {
        return excludedFieldAnnotations.stream().noneMatch(field::isAnnotationPresent);
    }
}
