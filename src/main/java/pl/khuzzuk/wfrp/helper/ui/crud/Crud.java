package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.ListDataProvider;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.khuzzuk.messaging.Cancellable;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.crud.filter.FilterConfiguration;
import pl.khuzzuk.wfrp.helper.ui.crud.form.CrudForm;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.lang.invoke.MethodHandles;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

@Slf4j
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class Crud<T> extends WebComponent {
    private static final MethodHandles.Lookup LOOKUP = MethodHandles.publicLookup();
    private SaveListener<T> saveListener = SaveListener.EMTPY;
    private DeleteListener<T> deleteListener = DeleteListener.EMPTY;
    private RefreshDataListener refreshDataListener = RefreshDataListener.EMPTY;

    private final Class<T> beanType;
    private final FormFieldFactory formFieldFactory;

    private AutoBindings<T> bindings;
    private Cancellable<Event> subscription;
    private Collection<T> data = new ArrayList<>();
    private ListDataProvider<T> dataProvider;

    @CSS(classNames = "button", id = "create-button")
    private Button createButton = new Button(VaadinIcon.PLUS.create());
    @CSS(classNames = "button", id = "edit-button")
    private Button editButton = new Button(VaadinIcon.EDIT.create());
    @CSS(classNames = "button", id = "remove-button")
    private Button removeButton = new Button(VaadinIcon.MINUS.create());
    @CSS(classNames = "button-group")
    private HorizontalLayout crudButtons = new HorizontalLayout(createButton, editButton, removeButton);
    @UIProperty
    @CSS(classNames = {"crud", "filters-group"})
    private HorizontalLayout filters = new HorizontalLayout(crudButtons);
    @UIProperty
    @CSS(classNames = "crud-grid")
    private Grid<T> table;
    private CrudForm<T> createForm;

    public static <T> Crud<T> forBean(Class<T> beanType, FormFieldFactory formFieldFactory) {
        Crud<T> crud = new Crud<>(beanType, formFieldFactory);
        crud.initialize();
        return crud;
    }

    public void refresh(QueryAllResult<T> queryAllResult) {
        if (beanType.equals(queryAllResult.getType())) {
            refreshData(queryAllResult.getItems());
        }
        bindings.onData(queryAllResult);
    }

    private void initialize() {
        table = new Grid<>(beanType);
        createColumnsInTable();
        dataProvider = DataProvider.ofCollection(data);
        table.setDataProvider(dataProvider);

        table.addSelectionListener(e -> removeButton.setEnabled(getSelected() != null));
        table.addSelectionListener(e -> editButton.setEnabled(getSelected() != null));

        prepareForms();

        FilterConfiguration<T> filterConfiguration = FilterConfiguration.forType(beanType, dataProvider);
        filterConfiguration.getFilterFields().forEach(filters::add);
    }

    private void createColumnsInTable() {
        table.getColumns().forEach(table::removeColumn);
        for (Field f : ReflectionUtils.getFields(beanType)) {
            if (ExclusionFieldsUtils.canIncludeInForm(f)) {
                addFieldToTable(f);
            }
        }
    }

    public void requestData() {
        bindings.requestData(type -> refreshDataListener.onRefreshData(type));
    }

    private void addFieldToTable(Field field) {
        table.addColumn(field.getName());
    }

    @SuppressWarnings("unchecked")
    private void prepareForms() {
        bindings = BindingsFactory.create(beanType, formFieldFactory);

        createForm = CrudForm.createFor(bindings, bean -> saveListener.onSave(bean));
        createButton.addClickListener(e -> createForm.showForm());

        editButton.setEnabled(false);
        editButton.addClickListener(e -> createForm.showForm(getSelected()));

        removeButton.addClickListener(e -> remove());
        removeButton.setEnabled(false);
    }

    private void remove() {
        T selectedItem = getSelected();
        if (selectedItem != null) {
            deleteListener.onDelete(selectedItem);
        }
    }

    private void refreshData(Collection<T> newData) {
        data.clear();
        data.addAll(newData);
        execute(() -> dataProvider.refreshAll());
        execute(() -> getUI().get().push());
    }

    private T getSelected() {
        Iterator<T> iterator = table.getSelectedItems().iterator();
        return iterator.hasNext() ? iterator.next() : null;
    }

    public void onSave(SaveListener<T> saveListener) {
        this.saveListener = saveListener;
    }

    public void onDelete(DeleteListener<T> deleteListener) {
        this.deleteListener = deleteListener;
    }

    public void onRefreshRequest(RefreshDataListener refreshDataListener) {
        this.refreshDataListener = refreshDataListener;
    }
}
