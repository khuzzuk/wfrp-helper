package pl.khuzzuk.wfrp.helper.ui.crud.type;

import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.converter.StringToFloatConverter;
import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;

import java.lang.reflect.Field;

public class FloatTypeFieldApplier implements TypeFieldApplier<Float> {
    @Override
    public boolean supportType(Class<?> type) {
        return Float.class.equals(type) || float.class.equals(type);
    }

    @Override
    public void apply(Field field, AutoBindings<?> bindings, String propertyPath) {
        bindings.bind(new TextField(field.getName()),
                propertyPath,
                new StringToFloatConverter("Please enter a number"));
    }
}
