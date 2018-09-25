package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.textfield.TextField;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityOneToManyField;

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
    @SuppressWarnings("unchecked")
    HasValue<?, ?> getComponentFor(Field field) {
        Class<?> type = field.getType();
        String name = field.getName();

        if (type.equals(String.class)) {
            return new TextField(name);
        }

        if (type.equals(int.class)) {
            TextField intField = new TextField();
            return intField;
        }

        if (Collection.class.isAssignableFrom(type)) {
            ParameterizedType genericType = (ParameterizedType) field.getGenericType(); //collections should be parametrized, otherwise it's not bindable by crud
            Type[] actualTypeArguments = genericType.getActualTypeArguments();
            if (actualTypeArguments.length == 1 && canHaveEditor(actualTypeArguments[0])) {
                Class<?> elementType = (Class<?>) actualTypeArguments[0];
                Bindings<?> bindings = BindingsFactory.create(elementType, this);

                EntityOneToManyField entityField = EntityOneToManyField.createFor(elementType);
                entityField.setValue(collectionFromFieldType(type));
                Dialog form = CreateItemFormFactory.createForm(bindings, e ->
                        entityField.addEntity(bindings.createNewInstance()));
                Button button = new Button(VaadinIcon.PLUS.create());
                button.addClickListener(e -> form.open());
                entityField.add(button);

                return entityField;
            }
            return new ComboBox<>(name);
        }

        if (Enum.class.isAssignableFrom(type)) {
            ComboBox<Enum> enumField = new ComboBox<>(name);
            enumField.setItems(EnumSet.allOf((Class<Enum>) type));
            return enumField;
        }

        throw new IllegalArgumentException(String.format("No mapping for field %s: %s", name, type));
    }

    private static boolean canHaveEditor(Type type) {
        return ((Class<?>) type).isAnnotationPresent(Entity.class);
    }

    private Collection collectionFromFieldType(Class<?> type) {
        if (Set.class.isAssignableFrom(type)) {
            return new HashSet();
        }
        if (List.class.isAssignableFrom(type)) {
            return new ArrayList();
        }
        return new ArrayDeque();
    }
}
