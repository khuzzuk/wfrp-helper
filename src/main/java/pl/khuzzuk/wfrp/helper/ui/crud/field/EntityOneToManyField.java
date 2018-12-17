package pl.khuzzuk.wfrp.helper.ui.crud.field;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.shared.Registration;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Supplier;

@RequiredArgsConstructor
public class EntityOneToManyField<T> extends VerticalLayout implements HasValue<HasValue.ValueChangeEvent<Collection<T>>, Collection<T>> {
    final List<Component> components;
    private final List<ValueChangeListener<? super ValueChangeEvent<Collection<T>>>> listeners;
    private final Supplier<? extends Collection<T>> defaultValuesProvider;
    private Label name = new Label("Entities");
    Collection<T> current = Collections.emptyList();
    @Setter
    Consumer<T> onEdit = any -> {};

    public void addCustomComponent(Component component) {
        components.add(component);
        refreshView();
    }

    public void setName(String name) {
        this.name.setText(name);
    }

    @Override
    public void setValue(Collection<T> values) {
        current = values;
        refreshView();
    }

    public void addEntity(T entity) {
        current.add(entity);
        refreshView();
    }

    void removeValue(T bean) {
        current.remove(bean);
        refreshView();
    }

    void assureDataInit() {
        if (current == null) {
            current = defaultValuesProvider.get();
        }
    }

    public void refreshView() {
        removeAll();
        add(name);

        assureDataInit();

        current.forEach(t -> {
            Button removeButton = new Button(VaadinIcon.MINUS.create());
            removeButton.addClickListener(e -> removeValue(t));
            Button editButton = new Button(VaadinIcon.EDIT.create());
            editButton.addClickListener(e -> onEdit.accept(t));
            add(new HorizontalLayout(editButton, removeButton, new Label(t.toString())));
        });
        components.forEach(this::add);
    }

    @Override
    public Collection<T> getValue() {
        return current;
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
                .noneMatch(Component::isVisible);
    }

    @Override
    public void setRequiredIndicatorVisible(boolean requiredIndicatorVisible) {
    }

    @Override
    public boolean isRequiredIndicatorVisible() {
        return false;
    }
}
