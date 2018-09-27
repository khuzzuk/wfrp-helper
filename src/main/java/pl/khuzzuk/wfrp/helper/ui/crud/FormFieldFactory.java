package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.converter.StringToIntegerConverter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityOneToManyField;

import javax.persistence.Entity;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.*;

@Slf4j
@AllArgsConstructor
@Component
public class FormFieldFactory {
    private EntityOneToManyFieldFactory entityOneToManyFieldFactory;

    @SuppressWarnings({"unchecked", "rawtypes"})
    void bindWithComponent(Field field, Bindings<?> bindings) {
        Class<?> type = field.getType();
        String name = field.getName();

        if (type.equals(String.class)) {
            bindings.bind(new TextField(name), name);

        } else if (type.equals(int.class)) {
            bindings.bind(new TextField(name), name, new StringToIntegerConverter("Please enter a number"));

        } else if (Collection.class.isAssignableFrom(type)) {
            ParameterizedType genericType = (ParameterizedType) field.getGenericType(); //collections should be parametrized, otherwise it's not bindable by crud
            Type[] actualTypeArguments = genericType.getActualTypeArguments();
            if (actualTypeArguments.length == 1 && canHaveEditor(actualTypeArguments[0])) {
                EntityOneToManyField<?> entityField = entityOneToManyFieldFactory.create((Class) actualTypeArguments[0], collectionFromFieldType(type), this);
                bindings.bind(entityField, name);
            } else {
                bindings.bind(new ComboBox<>(name), name);
            }

        } else if (Enum.class.isAssignableFrom(type)) {
            ComboBox<Enum> enumField = new ComboBox<>(name);
            enumField.setItems(EnumSet.allOf((Class<Enum>) type));
            bindings.bind(enumField, name);

        } else {
            throw new IllegalArgumentException(String.format("No mapping for field %s: %s", name, type));
        }
    }

    private static boolean canHaveEditor(Type type) {
        return ((Class<?>) type).isAnnotationPresent(Entity.class);
    }

    private static <V> Collection<V> collectionFromFieldType(Class<V> type) {
        if (Set.class.isAssignableFrom(type)) {
            return new HashSet<>();
        }
        if (List.class.isAssignableFrom(type)) {
            return new ArrayList<>();
        }
        return new ArrayDeque<>();
    }
}
