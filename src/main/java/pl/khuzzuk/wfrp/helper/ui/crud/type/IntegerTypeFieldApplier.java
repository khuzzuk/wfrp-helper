package pl.khuzzuk.wfrp.helper.ui.crud.type;

import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.converter.StringToIntegerConverter;
import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;

import java.lang.reflect.Field;

public class IntegerTypeFieldApplier implements TypeFieldApplier<Integer> {
    @Override
    public boolean supportType(Class<?> type) {
        return Integer.class.equals(type) || int.class.equals(type);
    }

    @Override
    public void apply(Field field, AutoBindings<?> bindings, String propertyPath) {
        bindings.bind(new TextField(field.getName()),
                propertyPath,
                new StringToIntegerConverter("Please enter a natural number"));
    }
}
