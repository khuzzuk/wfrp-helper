package pl.khuzzuk.wfrp.helper.ui.crud.field;

import com.vaadin.flow.component.AbstractField;
import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.shared.Registration;

import java.util.LinkedList;
import java.util.List;

public class EntityOneToOneField<T> extends Button implements HasValue<HasValue.ValueChangeEvent<T>, T> {
    private T value;
    private List<ValueChangeListener<? super ValueChangeEvent<T>>> changeListeners = new LinkedList<>();

    @Override
    public void setValue(T value) {
        ValueChangeEvent<T> changeEvent = new AbstractField.ComponentValueChangeEvent<>(
                this, this, value, true);
        changeListeners.forEach(l -> l.valueChanged(changeEvent));
        this.value = value;
        setText(value != null ? value.toString() : "Add");
    }

    @Override
    public T getValue() {
        return value;
    }

    @Override
    public Registration addValueChangeListener(ValueChangeListener<? super ValueChangeEvent<T>> listener) {
        changeListeners.add(listener);
        return () -> changeListeners.remove(listener);
    }

    @Override
    public void setReadOnly(boolean readOnly) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isReadOnly() {
        return false;
    }

    @Override
    public void setRequiredIndicatorVisible(boolean requiredIndicatorVisible) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isRequiredIndicatorVisible() {
        return false;
    }
}
