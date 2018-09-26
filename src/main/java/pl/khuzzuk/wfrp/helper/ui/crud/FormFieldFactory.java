package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.converter.StringToIntegerConverter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityOneToManyField;
import pl.khuzzuk.wfrp.helper.ui.crud.form.CreateForm;

import javax.persistence.Entity;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collection;
import java.util.EnumSet;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
public class FormFieldFactory {
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
                Class<?> elementType = (Class<?>) actualTypeArguments[0];
                Bindings subEntityBindings = BindingsFactory.create(elementType, this);

                EntityOneToManyField entityField = EntityOneToManyField.createFor((Class) elementType, collectionFromFieldType(type));
                CreateForm<?> form = CreateItemFormFactory.createForm(subEntityBindings, entityField::addEntity);
                Button button = new Button(VaadinIcon.PLUS.create());
                button.addClickListener(e -> form.showForm());
                entityField.addComponent(button);

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
