package pl.khuzzuk.wfrp.helper.ui.crud.type;

import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.converter.StringToDoubleConverter;
import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;

import java.lang.reflect.Field;

public class DoubleTypeFieldApplier implements TypeFieldApplier<Double> {
    @Override
    public boolean supportType(Class<?> type) {
        return Double.class.equals(type) || double.class.equals(type);
    }

    @Override
    public void apply(Field field, AutoBindings<?> bindings, String propertyPath) {
        bindings.bind(new TextField(field.getName()),
                propertyPath,
                new StringToDoubleConverter("Please enter a number"));
    }
}
