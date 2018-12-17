package pl.khuzzuk.wfrp.helper.ui.field;

import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.listbox.ListBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.data.binder.HasDataProvider;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.shared.Registration;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Tag("list-builder")
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ListBuilder<T> extends HorizontalLayout implements
        HasDataProvider<T>,
        HasValue<HasValue.ValueChangeEvent<Collection<T>>, Collection<T>> {
    @CSS(classNames = {"button", "list-builder-button"}, id = "toResult")
    private Button toResult = new Button(VaadinIcon.ARROW_RIGHT.create());
    @CSS(classNames = {"button", "list-builder-button"}, id = "toSource")
    private Button toSource = new Button(VaadinIcon.ARROW_LEFT.create());

    @UIProperty
    @CSS(classNames = {"list-builder", "list"}, id = "source")
    private ListBox<T> sourceList = new ListBox<>();
    @UIProperty
    private VerticalLayout buttonGroup = new VerticalLayout(toResult, toSource);
    @UIProperty
    @CSS(classNames = {"list-builder", "list"}, id = "result")
    private ListBox<T> resultList = new ListBox<>();

    private DataProvider<T, ?> sourceDataProvider;
    private DataProvider<T, ?> resultDataProvider;
    private Collection<T> source;
    private Collection<T> result;

    private List<ValueChangeListener<? super ValueChangeEvent<Collection<T>>>> changeListeners = new ArrayList<>();

    public static <T> ListBuilder<T> create() {
        ListBuilder<T> listBuilder = new ListBuilder<>();
        listBuilder.resultDataProvider = DataProvider.ofCollection(initialValues);
        listBuilder.source = initialValues;
        listBuilder.init();

        return listBuilder;
    }

    private void init() {
        ComponentInitialization.initializeComponents(this);
        sourceList.addValueChangeListener(event -> toResult.setEnabled(event.getValue() != null));
        resultList.addValueChangeListener(event -> toSource.setEnabled(event.getValue() != null));
        toResult.addClickListener(event -> moveToResult());
        toSource.addClickListener(event -> moveToSource());
    }

    private void moveToResult() {
        swapValue(sourceList, result, source);
    }


    private void moveToSource() {
        swapValue(resultList, source, result);
    }

    private void swapValue(ListBox<T> listBox, Collection<T> to, Collection<T> from) {
        T value = listBox.getValue();
        to.add(value);
        from.remove(value);
        listBox.setValue(null);
        getUI().ifPresent(UI::push);
    }

    public void reset() {
        source.addAll(result);
        result.clear();
        getUI().ifPresent(UI::push);
    }

    @Override
    public void setDataProvider(DataProvider<T, ?> dataProvider) {
        sourceDataProvider = dataProvider;
    }

    public void setSource(Collection<T> source) {
        this.source = source;

    }

    @Override
    public void setValue(Collection<T> value) {
        result = value;
        source.removeAll(value);
        getUI().ifPresent(UI::push);
    }

    @Override
    public List<T> getValue() {
        ArrayList<T> value = new ArrayList<>(result);
        source.addAll(result);
        result.clear();
        return value;
    }

    @Override
    public Registration addValueChangeListener(ValueChangeListener<? super ValueChangeEvent<Collection<T>>> listener) {
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
