package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import static pl.khuzzuk.wfrp.helper.ui.crud.ExclusionFieldsUtils.isFieldExcluded;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class Crud<T> extends WebComponent {

    private final Bus<Event> bus;

    @UIProperty
    private Grid<T> table;
    private Button createButton = new Button("Create");
    @UIProperty
    private HorizontalLayout crudButtons = new HorizontalLayout(createButton);
    private Dialog createForm = new Dialog();

    public static <T> Crud<T> forBean(Class<T> beanType, Bus<Event> bus, FormFieldFactory formFieldFactory) {
        Crud<T> crud = new Crud<>(bus);
        crud.table = new Grid<>(beanType);
        getExcludedColumns(beanType).forEach(crud.table::removeColumnByKey);
        ComponentInitialization.initializeComponents(crud);
        crud.prepareCreateItemForm(beanType, formFieldFactory);
        return crud;
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

    private void prepareCreateItemForm(Class<T> beanType, FormFieldFactory formFieldFactory) {
        Field[] fields = beanType.getDeclaredFields();
        for (Field field : fields) {
            if (!isFieldExcluded(field)) {
                createForm.add(formFieldFactory.getComponentFor(field));
            }
        }
        createButton.addClickListener(e -> createForm.open());
    }
}
