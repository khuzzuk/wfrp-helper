package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.ListDataProvider;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.DisposableBean;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.messaging.Cancellable;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.crud.form.CrudForm;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.lang.invoke.MethodHandles;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

@Slf4j
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class Crud<T> extends WebComponent implements DisposableBean {
    private static final MethodHandles.Lookup LOOKUP = MethodHandles.publicLookup();

    private final Bus<Event> bus;
    private final Class<T> beanType;
    private final FormFieldFactory formFieldFactory;

    private AutoBindings<T> bindings;
    private Cancellable<Event> subscription;
    private Collection<T> data = new ArrayList<>();
    private ListDataProvider<T> dataProvider;

    @UIProperty
    private Grid<T> table;
    private Button createButton = new Button("Create");
    private Button editButton = new Button("Edit");
    private Button removeButton = new Button("Remove");
    @UIProperty
    private HorizontalLayout crudButtons = new HorizontalLayout(createButton, editButton, removeButton);
    private CrudForm<T> createForm;

    public static <T> Crud<T> forBean(Class<T> beanType, Bus<Event> bus, FormFieldFactory formFieldFactory) {
        log.info("start create crud for {}", beanType);
        Crud<T> crud = new Crud<>(bus, beanType, formFieldFactory);
        crud.initialize();
        log.info("finished create crud for {}", beanType);
        return crud;
    }

    private void listAll(QueryAllResult<T> queryAllResult) {
        if (beanType.equals(queryAllResult.getType())) {
            refreshData(queryAllResult.getItems());
        }
        bindings.onData(queryAllResult);
    }

    private void initialize() {
        table = new Grid<>(beanType);
        createColumnsInTable();
        ComponentInitialization.initializeComponents(this);
        dataProvider = DataProvider.ofCollection(data);
        table.setDataProvider(dataProvider);

        table.addSelectionListener(e -> removeButton.setEnabled(getSelected() != null));
        table.addSelectionListener(e -> editButton.setEnabled(getSelected() != null));

        prepareForms();
        subscription = bus.subscribingFor(Event.DATA_ALL).accept(this::listAll).subscribe();
        bindings.requestData(type -> bus.message(Event.FIND_ALL).withContent(type).send());
    }

    private void createColumnsInTable() {
        table.getColumns().forEach(table::removeColumn);
        for (Field f : ReflectionUtils.getFields(beanType)) {
            if (ExclusionFieldsUtils.canIncludeInForm(f)) {
                addFieldToTable(f);
            }
        }
    }

    private void addFieldToTable(Field field) {
        table.addColumn(field.getName());
    }

    @SuppressWarnings("unchecked")
    private void prepareForms() {
        bindings = BindingsFactory.create(beanType, formFieldFactory);
        log.info("bindings ready for {}", beanType);

        createForm = CrudForm.createFor(bindings, this::save);
        createButton.addClickListener(e -> createForm.showForm());

        editButton.setEnabled(false);
        editButton.addClickListener(e -> createForm.showForm(getSelected()));

        removeButton.addClickListener(e -> remove());
        removeButton.setEnabled(false);
    }

    private void save(T bean) {
        bus.message(Event.SAVE)
                .withContent(bean)
                .onError(() -> execute(() -> {
                    Dialog dialog = new Dialog();
                    dialog.add(new Label("Exception during save entity"));
                    dialog.open();
                }))
                .send();
    }

    private void remove() {
        T selectedItem = getSelected();
        if (selectedItem != null) {
            bus.message(Event.DELETE).withContent(selectedItem).send();
        }
    }

    private void refreshData(Collection<T> newData) {
        data.clear();
        data.addAll(newData);
        execute(() -> dataProvider.refreshAll());
    }

    private T getSelected() {
        Iterator<T> iterator = table.getSelectedItems().iterator();
        return iterator.hasNext() ? iterator.next() : null;
    }

    @Override
    public void destroy() {
        if (subscription != null) {
            bus.unSubscribe(subscription);
        }
    }
}
