package pl.khuzzuk.wfrp.helper.common;

import lombok.experimental.UtilityClass;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@UtilityClass
public class ReflectionUtils {
    public static Class<?> getGenericParameterType(Field field) {
        //collections should be parametrized, otherwise it's not possible to bind by crud
        ParameterizedType genericType = (ParameterizedType) field.getGenericType();
        Type[] actualTypeArguments = genericType.getActualTypeArguments();
        if (actualTypeArguments.length != 1) {
            throw new IllegalArgumentException(String.format("Field do not have 1 generic parameter: %s", field));
        }
        return (Class<?>) actualTypeArguments[0];
    }

    public static <E, V extends Collection<E>> Supplier<? extends Collection<E>> collectionFromFieldTypeProvider(Class<V> type) {
        if (Set.class.isAssignableFrom(type)) {
            return HashSet::new;
        }
        if (List.class.isAssignableFrom(type)) {
            return ArrayList::new;
        }
        return ArrayDeque::new;
    }

    public static Collection<Field> getFields(Class<?> type) {
        List<Class<?>> typesHierarchy = new LinkedList<>();
        Class<?> currentType = type;
        while (!Object.class.equals(currentType)) {
            typesHierarchy.add(0, currentType);
            currentType = currentType.getSuperclass();
        }

        return typesHierarchy.stream()
                .map(Class::getDeclaredFields)
                .flatMap(Arrays::stream)
                .collect(Collectors.toList());
    }

    public static Field getFieldByName(Class<?> type, String name) throws NoSuchFieldException {
        Class<?> currentType = type;
        while (!Object.class.equals(type)) {
            try {
                return currentType.getDeclaredField(name);
            } catch (NoSuchFieldException ignored) {
                currentType = currentType.getSuperclass();
            }
        }
        throw new NoSuchFieldException(String.format("No field named %s found in %s", name, type));
    }
}
