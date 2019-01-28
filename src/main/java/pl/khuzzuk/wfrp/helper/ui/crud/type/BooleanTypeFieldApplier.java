package pl.khuzzuk.wfrp.helper.ui.crud.type;

import com.vaadin.flow.component.checkbox.Checkbox;
import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;

import java.lang.reflect.Field;

public class BooleanTypeFieldApplier implements TypeFieldApplier<Boolean> {
    @Override
    public boolean supportType(Class<?> type) {
        return boolean.class.equals(type) || Boolean.class.equals(type);
    }

    @Override
    public void apply(Field field, AutoBindings<?> bindings, String propertyPath) {
        Checkbox checkbox = new Checkbox(field.getName());
        checkbox.setId(FormFieldFactory.ID_PREFIX + propertyPath);
        bindings.bind(checkbox, propertyPath);
    }
}
