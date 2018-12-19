package pl.khuzzuk.wfrp.helper.ui.field;

import com.vaadin.flow.component.AttachEvent;
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
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.shared.Registration;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
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
    private VerticalLayout buttonGroup = new VerticalLayout(toResult, toSource);

    @CSS(classNames = {"list-builder", "list"}, id = "source")
    private ListBox<T> leftList = new ListBox<>();
    @CSS(classNames = {"list-builder", "list"}, id = "result")
    private ListBox<T> rightList = new ListBox<>();

    @UIProperty
    @CSS(classNames = "list-builder-layout")
    private HorizontalLayout root = new HorizontalLayout(leftList, buttonGroup, rightList);

    private Collection<T> left = new ArrayList<>();
    private Collection<T> right = new ArrayList<>();
    private DataProvider<T, ?> leftDataProvider = DataProvider.ofCollection(left);
    private DataProvider<T, ?> rightDataProvider;

    private List<ValueChangeListener<? super ValueChangeEvent<Collection<T>>>> changeListeners = new ArrayList<>();

    public static <T> ListBuilder<T> create() {
        ListBuilder<T> listBuilder = new ListBuilder<>();
        listBuilder.init();
        return listBuilder;
    }

    private void init() {
        ComponentInitialization.initializeComponents(this);
        leftList.addValueChangeListener(event -> toResult.setEnabled(event.getValue() != null));
        rightList.addValueChangeListener(event -> toSource.setEnabled(event.getValue() != null));
        toResult.addClickListener(event -> moveToResult());
        toSource.addClickListener(event -> moveToSource());
        leftList.setDataProvider(leftDataProvider);
        reset(Collections.emptyList());
    }

    private void moveToResult() {
        swapValue(leftList, right, left);
    }

    private void moveToSource() {
        swapValue(rightList, left, right);
    }

    private void swapValue(ListBox<T> listBox, Collection<T> to, Collection<T> from) {
        T value = listBox.getValue();
        to.add(value);
        from.remove(value);
        listBox.setValue(null);
        leftDataProvider.refreshAll();
        rightDataProvider.refreshAll();
        getUI().ifPresent(UI::push);
    }

    public void reset(Collection<T> left) {
        this.left.clear();
        this.left.addAll(left);
        setValue(new ArrayList<>());
        toResult.setEnabled(false);
        toSource.setEnabled(false);
    }

    @Override
    public void setDataProvider(DataProvider<T, ?> dataProvider) {
        Collection<T> items = ((ListDataProvider<T>) dataProvider).getItems();
        reset(items);
    }

    @Override
    public void setItems(Collection<T> items) {
        left.clear();
        left.addAll(items);
        getUI().ifPresent(this::refreshLists);
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        getUI().ifPresent(this::refreshLists);
    }

    private void refreshLists(UI ui) {
        ui.access(() -> {
            leftDataProvider.refreshAll();
            if (rightDataProvider != null) {
                rightDataProvider.refreshAll();
            }
        });
    }

    @Override
    public void setValue(Collection<T> value) {
        right = value;
        rightDataProvider = DataProvider.ofCollection(value);
        rightList.setDataProvider(rightDataProvider);
        left.removeAll(value);
        leftDataProvider.refreshAll();
        getUI().ifPresent(UI::push);
    }

    @Override
    public Collection<T> getValue() {
        return right;
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