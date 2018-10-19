package pl.khuzzuk.wfrp.helper.ui.crud.type;

import com.vaadin.flow.component.textfield.TextField;
import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;

import java.lang.reflect.Field;

public class StringTypeFieldApplier implements TypeFieldApplier<String> {
    @Override
    public boolean supportType(Class<?> type) {
        return String.class.isAssignableFrom(type);
    }

    @Override
    public void apply(Field field, AutoBindings<?> bindings, String propertyPath) {
        bindings.bind(new TextField(field.getName()), propertyPath);
    }
}
