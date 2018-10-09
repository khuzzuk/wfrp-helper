package pl.khuzzuk.wfrp.helper.ui.crud;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Supplier;

public class ReflectionUtils {
    public static Class getGenericParameterType(Field field) {
        ParameterizedType genericType = (ParameterizedType) field.getGenericType(); //collections should be parametrized, otherwise it's not bindable by crud
        Type[] actualTypeArguments = genericType.getActualTypeArguments();
        if (actualTypeArguments.length != 1) {
            throw new IllegalArgumentException(String.format("Field do not have 1 generic parameter: %s", field));
        }
        return (Class<?>) actualTypeArguments[0];
    }

    public static <V> Supplier<Collection<V>> collectionFromFieldTypeProvider(Class<V> type) {
        if (Set.class.isAssignableFrom(type)) {
            return HashSet::new;
        }
        if (List.class.isAssignableFrom(type)) {
            return ArrayList::new;
        }
        return ArrayDeque::new;
    }
}
