package pl.khuzzuk.wfrp.helper.ui.crud.type;

import com.vaadin.flow.component.combobox.ComboBox;
import pl.khuzzuk.wfrp.helper.edit.EnumFilter;
import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.stream.Collectors;

public class EnumTypeFieldApplier implements TypeFieldApplier<Double> {
    @Override
    public boolean supportType(Class<?> type) {
        return Enum.class.isAssignableFrom(type);
    }

    @Override
    public void apply(Field field, AutoBindings<?> bindings, String propertyPath) {
        Class type = field.getType();
        ComboBox<Enum> enumField = new ComboBox<>(field.getName());

        if (field.isAnnotationPresent(EnumFilter.class)) {
            enumField.setItems(Arrays.stream(field.getDeclaredAnnotation(EnumFilter.class).value())
                    .map(v -> Enum.valueOf(type, v))
                    .collect(Collectors.toSet()));
        } else {
            enumField.setItems(EnumSet.allOf(type));
        }
        bindings.bind(enumField, propertyPath);
    }
}
