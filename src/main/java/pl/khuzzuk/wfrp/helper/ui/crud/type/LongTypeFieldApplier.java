package pl.khuzzuk.wfrp.helper.ui.crud.type;

import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.converter.StringToLongConverter;
import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;

import java.lang.reflect.Field;

public class LongTypeFieldApplier implements TypeFieldApplier<Long> {
    @Override
    public boolean supportType(Class<?> type) {
        return Long.class.equals(type) || long.class.equals(type);
    }

    @Override
    public void apply(Field field, AutoBindings<?> bindings, String propertyPath) {
        TextField textField = new TextField(field.getName());
        textField.setId(FormFieldFactory.ID_PREFIX + propertyPath);
        textField.setPattern("[+-]?[0-9]*");
        textField.setPreventInvalidInput(true);
        bindings.bind(textField, propertyPath, new StringToLongConverter(0L, "Please enter a natural number"));
    }
}
