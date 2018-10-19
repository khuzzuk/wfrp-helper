package pl.khuzzuk.wfrp.helper.ui.crud.type;

import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.converter.StringToLongConverter;
import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;

import java.lang.reflect.Field;

public class LongTypeFieldApplier implements TypeFieldApplier<Long> {
    @Override
    public boolean supportType(Class<?> type) {
        return Long.class.equals(type) || long.class.equals(type);
    }

    @Override
    public void apply(Field field, AutoBindings<?> bindings, String propertyPath) {
        bindings.bind(new TextField(field.getName()),
                propertyPath,
                new StringToLongConverter("Please enter a natural number"));
    }
}
