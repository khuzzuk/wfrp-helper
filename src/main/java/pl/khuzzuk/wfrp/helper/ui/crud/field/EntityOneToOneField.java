package pl.khuzzuk.wfrp.helper.ui.crud.field;

import com.vaadin.flow.component.AbstractField;
import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.shared.Registration;

import java.util.LinkedList;
import java.util.List;

public class EntityOneToOneField<T> extends Div implements HasValue<HasValue.ValueChangeEvent<T>, T> {
    private Button valueText = new Button();
    private VerticalLayout root = new VerticalLayout(valueText);
    private T value;
    private List<ValueChangeListener<? super ValueChangeEvent<T>>> changeListeners = new LinkedList<>();

    {
        add(root);
    }

    public void setName(String name) {
        root.add(new Label(name), valueText);
    }

    @Override
    public void setValue(T value) {
        ValueChangeEvent<T> changeEvent = new AbstractField.ComponentValueChangeEvent<>(
                this, this, value, true);
        changeListeners.forEach(l -> l.valueChanged(changeEvent));
        this.value = value;
        valueText.setText(value != null ? value.toString() : "Add");
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
