package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.textfield.TextField;

import java.lang.reflect.Field;
import java.util.Collection;

@org.springframework.stereotype.Component
public class FormFieldFactory {
    Component getComponentFor(Field field) {
        Class<?> type = field.getType();
        String name = field.getName();
        if (type.equals(String.class)) {
            return new TextField(name);
        }
        if (Collection.class.isAssignableFrom(type)) {
            return new ComboBox<>(name);
        }
        throw new IllegalArgumentException(String.format("No mapping for field %s: %s", name, type));
    }
}
