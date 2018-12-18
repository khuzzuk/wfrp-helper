package pl.khuzzuk.wfrp.helper.ui.crud.field;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.data.binder.HasDataProvider;
import com.vaadin.flow.data.provider.DataProvider;
import pl.khuzzuk.wfrp.helper.ui.field.ListBuilder;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.Supplier;

public class ListableEntityOneToManyField<T> extends EntityOneToManyField<T> implements HasDataProvider<T> {
    @UIProperty
    private ListBuilder<T> listBuilder = ListBuilder.create();
    private Collection<T> source;

    public ListableEntityOneToManyField() {
        this(new ArrayList<>(), new ArrayList<>(), ArrayList::new);
    }

    public ListableEntityOneToManyField(
            List<Component> components,
            List<ValueChangeListener<? super ValueChangeEvent<Collection<T>>>> valueChangeListeners,
            Supplier<? extends Collection<T>> initialValuesProvider) {
        super(components, valueChangeListeners, initialValuesProvider);
        initializeList();
    }

    private void initializeList() {
        ComponentInitialization.initializeComponents(this);
    }

    public void refreshData(Collection<T> data) {
        source = data;
        listBuilder.setItems(data);
    }

    @Override
    public void refreshView() {
        removeAll();
        add(listBuilder);
        components.forEach(this::add);
        if (source != null) {
            listBuilder.reset(source);
        }
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
        listBuilder.setDataProvider(dataProvider);
    }

    @Override
    public void setValue(Collection<T> values) {
        current = values;
        assureDataInit();
        refreshView();
        listBuilder.setValue(current);
    }
}
