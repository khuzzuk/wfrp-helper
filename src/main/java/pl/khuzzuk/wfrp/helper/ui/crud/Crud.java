package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.data.provider.ListDataProvider;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.DisposableBean;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.messaging.Cancellable;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static pl.khuzzuk.wfrp.helper.ui.crud.ExclusionFieldsUtils.isFieldExcluded;

@Slf4j
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class Crud<T> extends WebComponent implements DisposableBean {
    private static final MethodHandles.Lookup LOOKUP = MethodHandles.publicLookup();

    private final Bus<Event> bus;
    private final Class<T> beanType;
    private Event listAll;

    private MethodHandle creator;
    private Bindings<T> bindings;
    private Cancellable<Event> subscription;
    private Collection<T> data = new ArrayList<>();

    @UIProperty
    private Grid<T> table;
    private Button createButton = new Button("Create");
    @UIProperty
    private HorizontalLayout crudButtons = new HorizontalLayout(createButton);
    private Dialog createForm;

    public static <T> Crud<T> forBean(Class<T> beanType, Bus<Event> bus, FormFieldFactory formFieldFactory) {
        Crud<T> crud = new Crud<>(bus, beanType);
        crud.bindings = BindingsFactory.create(beanType, formFieldFactory);

        crud.table = new Grid<>(beanType);
        crud.table.setDataProvider(new ListDataProvider<>(crud.data));
        getExcludedColumns(beanType).forEach(crud.table::removeColumnByKey);
        ComponentInitialization.initializeComponents(crud);
        crud.prepareForms();
        return crud;
    }

    public void listAllWhen(Event event) {
        listAll = event;
        subscription = bus.subscribingFor(event).accept(this::refreshData).subscribe();
        bus.message(Event.FIND_ALL).withContent(beanType).withResponse(event).send();
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
        createForm = CreateItemFormFactory.createForm(bindings, e -> save());
        createButton.addClickListener(e -> createForm.open());
    }

    private void save() {
        try {
            T bean = bindings.createNewInstance();
            bindings.fill(bean);
            bus.message(Event.SAVE).withContent(bean).send();
            bus.message(Event.FIND_ALL).withContent(beanType).withResponse(listAll).send();
        } catch (Throwable throwable) {
            bus.message(Event.ERROR).withContent(ExceptionUtils.getStackTrace(throwable)).send();
        }
    }

    private void refreshData(Collection<T> newData) {
        data.clear();
        data.addAll(newData);
    }

    @Override
    public void destroy() {
        if (subscription != null) {
            bus.unSubscribe(subscription);
        }
    }
}
