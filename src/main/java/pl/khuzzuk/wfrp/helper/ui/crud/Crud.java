package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
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
import pl.khuzzuk.wfrp.helper.ui.crud.form.CreateForm;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.lang.invoke.MethodHandles;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import static pl.khuzzuk.wfrp.helper.ui.crud.ExclusionFieldsUtils.isFieldExcluded;

@Slf4j
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class Crud<T> extends WebComponent implements DisposableBean {
    private static final MethodHandles.Lookup LOOKUP = MethodHandles.publicLookup();

    private final Bus<Event> bus;
    private final Class<T> beanType;

    private Bindings<T> bindings;
    private Cancellable<Event> subscription;
    private Collection<T> data = new ArrayList<>();
    private ListDataProvider<T> dataProvider;
    private FormFieldFactory formFieldFactory;

    @UIProperty
    private Grid<T> table;
    private Button createButton = new Button("Create");
    private Button editButton = new Button("Edit");
    private Button removeButton = new Button("Remove");
    @UIProperty
    private HorizontalLayout crudButtons = new HorizontalLayout(createButton, editButton, removeButton);
    private CreateForm<T> createForm;

    public static <T> Crud<T> forBean(Class<T> beanType, Bus<Event> bus, FormFieldFactory formFieldFactory) {
        Crud<T> crud = new Crud<>(bus, beanType);
        crud.formFieldFactory = formFieldFactory;
        crud.table = new Grid<>(beanType);
        getExcludedColumns(beanType).forEach(crud.table::removeColumnByKey);
        crud.dataProvider = new ListDataProvider<>(crud.data);
        crud.table.setDataProvider(crud.dataProvider);
        ComponentInitialization.initializeComponents(crud);

        crud.prepareForms();
        crud.subscription = bus.subscribingFor(Event.DATA_ALL).accept(crud::listAll).subscribe();
        bus.message(Event.FIND_ALL).withContent(beanType).send();
        return crud;
    }

    @SuppressWarnings("unchecked") //cannot set collection with different element types then query type
    private void listAll(QueryAllResult<?> queryAllResult) {
        if (beanType.equals(queryAllResult.getType())) {
            refreshData((Collection<T>) queryAllResult.getItems());
        }
    }

    private static List<String> getExcludedColumns(Class<?> beanType) {
        List<String> excludedFields = new ArrayList<>();
        for (Field field : beanType.getDeclaredFields()) {
            if (isFieldExcluded(field)) {
                excludedFields.add(field.getName());
            }
        }
        return excludedFields;
    }

    @SuppressWarnings("unchecked")
    private void prepareForms() {
        bindings = BindingsFactory.create(beanType, formFieldFactory);

        createForm = CreateItemFormFactory.createForm(bindings, this::save);
        createButton.addClickListener(e -> createForm.showForm());

        removeButton.addClickListener(e -> remove());
    }

    private void save(T bean) {
        bus.message(Event.SAVE).withContent(bean).send();
    }

    private void remove() {
        Set<T> selectedItems = table.getSelectedItems();
        if (selectedItems.size() == 1) {
            T bean = selectedItems.iterator().next();
            bus.message(Event.DELETE).withContent(bean).send();
        }
    }

    private void refreshData(Collection<T> newData) {
        data.clear();
        data.addAll(newData);
        dataProvider.refreshAll();
    }

    @Override
    public void destroy() {
        if (subscription != null) {
            bus.unSubscribe(subscription);
        }
    }
}
