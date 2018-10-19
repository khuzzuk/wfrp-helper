package pl.khuzzuk.wfrp.helper.ui.crud.type;

import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;

import java.lang.reflect.Field;

public interface TypeFieldApplier<T> {
    boolean supportType(Class<?> type);
    void apply(Field field, AutoBindings<?> bindings, String propertyPath);
}
