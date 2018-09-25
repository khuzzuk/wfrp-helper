package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.dialog.Dialog;

public interface Bindings<T> {
    ReflectionBindings<T> add(String name, Binding<T, ?> binding);

    Binding<T, ?> get(String name, Class<?> fieldType);

    T createNewInstance();

    void fill(T bean);

    void addFieldsTo(Dialog form);
}
