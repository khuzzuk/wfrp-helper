package pl.khuzzuk.wfrp.helper.ui.crud.field;

import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.HasValue.ValueChangeEvent;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.listbox.ListBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.HasDataProvider;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.shared.Registration;
import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

public class MapEntityValueField<E, V> extends WebComponent implements
        HasDataProvider<E>,
        HasValue<ValueChangeEvent<Map<E, V>>, Map<E, V>> {
    private Collection<E> source = new ArrayList<>();
    @Getter
    @Setter
    private Map<E, V> value = new HashMap<>();
    private V defaultValue;
    private Function<String, V> converter;

    private List<ValueChangeListener<? super ValueChangeEvent<Map<E, V>>>> changeListeners = new ArrayList<>();

    private Label label;
    private VerticalLayout items = new VerticalLayout();
    private Button addButton = new Button(VaadinIcon.PLUS.create());

    @Getter
    @Setter
    private boolean requiredIndicatorVisible;
    @Getter
    @Setter
    private boolean readOnly;

    public MapEntityValueField(String name, V defaultValue, Function<String, V> converter) {
        label = new Label(name);
        this.defaultValue = defaultValue;
        this.converter = converter;
        add(label, items, addButton);
        addButton.addClickListener(event -> showElementSelector());
    }

    private void showElementSelector() {
        Dialog dialog = new Dialog();
        ListBox<E> items = new ListBox<>();
        items.setItems(source);

        Button addElementButton = new Button(VaadinIcon.PLUS.create());
        addElementButton.addClickListener(e -> {
            E item = items.getValue();
            value.put(item, defaultValue);
            refreshView();
        });

        Button cancelButton = new Button("Anuluj");
        cancelButton.addClickListener(e -> dialog.close());

        dialog.add(items, addElementButton, cancelButton);
        dialog.open();
    }

    private void refreshView() {
        items.removeAll();
        value.forEach(this::addItemView);
    }

    private void addItemView(E item, V value) {
        TextField textField = new TextField(item.toString());
        textField.addValueChangeListener(event -> changeValueMapping(item, converter.apply(event.getValue())));

        Button removeItemButton = new Button(VaadinIcon.MINUS.create());
        removeItemButton.addClickListener(event -> {
            this.value.remove(item);
            refreshView();
        });

        HorizontalLayout itemView = new HorizontalLayout(textField, removeItemButton);
        items.add(itemView);
    }

    private void changeValueMapping(E item, V newValue) {
        if (!value.containsKey(item)) {
            throw new IllegalArgumentException(String.format("Cannot edit missing item: %s", item));
        }

        value.put(item, newValue);
    }

    @Override
    public Registration addValueChangeListener(ValueChangeListener<? super ValueChangeEvent<Map<E, V>>> listener) {
        changeListeners.add(listener);
        return () -> changeListeners.remove(listener);
    }

    @Override
    public void setDataProvider(DataProvider<E, ?> dataProvider) {
        if (!(dataProvider instanceof ListDataProvider)) {
            throw new UnsupportedOperationException();
        }

        ListDataProvider<E> listDataProvider = (ListDataProvider<E>) dataProvider;
        source = listDataProvider.getItems();
    }

    @Override
    public void setItems(Collection<E> items) {
        source = items;
    }
}
