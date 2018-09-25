package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.dialog.Dialog;

class EmptyBindings<T> implements Bindings<T> {
    @Override
    public ReflectionBindings<T> add(String name, Binding<T, ?> binding) {
        return null;
    }

    @Override
    public Binding<T, ?> get(String name, Class<?> fieldType) {
        return null;
    }

    @Override
    public T createNewInstance() {
        return null;
    }

    @Override
    public void fill(T bean) {
        //nothing to do
    }

    @Override
    public void addFieldsTo(Dialog form) {
        // no fields to add
    }
}
