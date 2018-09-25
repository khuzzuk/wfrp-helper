package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.AbstractField;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.charts.model.Dial;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.textfield.TextField;

import javax.persistence.Entity;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Collection;

@org.springframework.stereotype.Component
public class FormFieldFactory {
    AbstractField getComponentFor(Field field) {
        Class<?> type = field.getType();
        String name = field.getName();
        if (type.equals(String.class)) {
            return new TextField(name);
        }
        if (Collection.class.isAssignableFrom(type)) {
            ParameterizedType genericType = (ParameterizedType) field.getGenericType(); //collections should be parametrized, otherwise it's not bindable by crud
            Type[] actualTypeArguments = genericType.getActualTypeArguments();
            if (actualTypeArguments.length == 1 && canHaveEditor(actualTypeArguments[0])) {
                Class<?> elementType = (Class<?>) actualTypeArguments[0];
                Dialog form = CreateItemFormFactory.createForm(elementType, this, );
                Button button = new Button(VaadinIcon.PLUS.create());
                button.addClickListener()
            }
            return new ComboBox<>(name);
        }
        throw new IllegalArgumentException(String.format("No mapping for field %s: %s", name, type));
    }

    private static boolean canHaveEditor(Type type) {
        return ((Class<?>) type).isAnnotationPresent(Entity.class);
    }
}
