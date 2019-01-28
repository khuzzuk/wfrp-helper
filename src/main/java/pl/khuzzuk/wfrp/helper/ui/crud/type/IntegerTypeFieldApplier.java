package pl.khuzzuk.wfrp.helper.ui.crud.type;

import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.converter.StringToIntegerConverter;
import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;

import java.lang.reflect.Field;

public class IntegerTypeFieldApplier implements TypeFieldApplier<Integer> {
    @Override
    public boolean supportType(Class<?> type) {
        return Integer.class.equals(type) || int.class.equals(type);
    }

    @Override
    public void apply(Field field, AutoBindings<?> bindings, String propertyPath) {
        TextField textField = new TextField(field.getName());
        textField.setId(FormFieldFactory.ID_PREFIX + propertyPath);
        textField.setPattern("[+-]?[0-9]*");
        textField.setPreventInvalidInput(true);
        bindings.bind(textField, propertyPath, new StringToIntegerConverter(0, "Please enter a natural number"));
    }
}
