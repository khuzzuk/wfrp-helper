package pl.khuzzuk.wfrp.helper.ui.crud.field;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.data.binder.HasDataProvider;
import com.vaadin.flow.data.provider.DataProvider;

import java.util.Collection;
import java.util.List;
import java.util.function.Supplier;

public class ListableEntityOneToManyField<T> extends EntityOneToManyField<T> implements HasDataProvider<T> {
    private Grid<T> list;
    public ListableEntityOneToManyField(
            Class<T> beanType,
            List<Component> components,
            List<ValueChangeListener<? super ValueChangeEvent<Collection<T>>>> valueChangeListeners,
            Supplier<? extends Collection<T>> initialValuesProvider) {
        super(components, valueChangeListeners, initialValuesProvider);
        initializeList(beanType);
    }

    private void initializeList(Class<T> beanType) {
        list = new Grid<>(beanType);
        addComponent(list);

        list.addSelectionListener(event -> event.getFirstSelectedItem().ifPresent(this::addEntity));
    }

    public void refreshData(Collection<T> data) {
        list.setItems(data);
    }

    @Override
    public void refreshView() {
        removeAll();
        current.forEach(t -> {
            Button removeButton = new Button(VaadinIcon.MINUS.create());
            removeButton.addClickListener(e -> removeValue(t));
            add(new HorizontalLayout(removeButton, new Label(t.toString())));
        });
        components.forEach(this::add);
    }

    @Override
    public void setRequiredIndicatorVisible(boolean requiredIndicatorVisible) {
    }

    @Override
    public boolean isRequiredIndicatorVisible() {
        return false;
    }

    @Override
    public void setDataProvider(DataProvider<T, ?> dataProvider) {
        list.setDataProvider(dataProvider);
    }
}
