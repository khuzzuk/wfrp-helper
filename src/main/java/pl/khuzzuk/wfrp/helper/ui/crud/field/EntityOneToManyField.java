package pl.khuzzuk.wfrp.helper.ui.crud.field;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.shared.Registration;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EntityOneToManyField<T> extends VerticalLayout implements HasValue<HasValue.ValueChangeEvent<Collection<T>>, Collection<T>> {
    private List<Component> components = new ArrayList<>();
    private Collection<T> values = new ArrayList<>();
    private List<ValueChangeListener<? super ValueChangeEvent<Collection<T>>>> listeners = new ArrayList<>();

    public static <T> EntityOneToManyField<T> createFor(Class<T> type, Collection<T> initialValues) {
        EntityOneToManyField<T> field = new EntityOneToManyField<>();
        field.values = initialValues;
        return field;
    }

    public void addComponent(Component component) {
        components.add(component);
    }

    @Override
    public void setValue(Collection<T> values) {
        this.values.clear();
        if (values != null) {
            values.addAll(values);
        }
        refreshView();
    }

    public void addEntity(T entity) {
        values.add(entity);
        refreshView();
    }

    private void refreshView() {
        removeAll();
        values.stream()
                .map(Objects::toString)
                .map(Label::new)
                .forEach(this::add);
        components.forEach(this::add);
    }

    @Override
    public Collection<T> getValue() {
        return values;
    }

    @Override
    public Registration addValueChangeListener(ValueChangeListener<? super ValueChangeEvent<Collection<T>>> listener) {
        listeners.add(listener);
        return () -> listeners.remove(listener);
    }

    @Override
    public void setReadOnly(boolean readOnly) {
        components.forEach(component -> component.setVisible(!readOnly));
    }

    @Override
    public boolean isReadOnly() {
        return components.stream()
                .map(Component::isVisible)
                .allMatch(b -> !b);
    }

    @Override
    public void setRequiredIndicatorVisible(boolean requiredIndicatorVisible) {
    }

    @Override
    public boolean isRequiredIndicatorVisible() {
        return false;
    }
}
