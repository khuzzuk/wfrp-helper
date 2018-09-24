package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static pl.khuzzuk.wfrp.helper.ui.crud.ExclusionFieldsUtils.isFieldExcluded;

@Slf4j
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class Crud<T> extends WebComponent {
    private static final MethodHandles.Lookup lookup = MethodHandles.publicLookup();

    private final Bus<Event> bus;

    private MethodHandle creator;
    private Map<String, Binding> bindings = new HashMap<>();

    @UIProperty
    private Grid<T> table;
    private Button createButton = new Button("Create");
    @UIProperty
    private HorizontalLayout crudButtons = new HorizontalLayout(createButton);
    private Dialog createForm = new Dialog();

    public static <T> Crud<T> forBean(Class<T> beanType, Bus<Event> bus, FormFieldFactory formFieldFactory) {
        Crud<T> crud = new Crud<>(bus);
        crud.createBinding(beanType);

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

    private void createBinding(Class<?> beanType) {
        try {
            MethodType constructor = MethodType.methodType(void.class);
            creator = lookup.findConstructor(beanType, constructor);

            Field[] fields = beanType.getDeclaredFields();
            for (Field field : fields) {
                if (!isFieldExcluded(field)) {
                    String fieldName = field.getName();
                    Binding binding = bindings.computeIfAbsent(fieldName, Binding::new);

                    String setterName = "set" + StringUtils.capitalize(fieldName);
                    MethodType setterMethodType = MethodType.methodType(void.class, field.getType());
                    MethodHandle setterMethodHandle = lookup.findVirtual(beanType, setterName, setterMethodType);
                    binding.setSetter(setterMethodHandle);

                    String getterName = "get" + StringUtils.capitalize(fieldName);
                    MethodType getterMethodType = MethodType.methodType(field.getType());
                    MethodHandle getterMethodHandle = lookup.findVirtual(beanType, getterName, getterMethodType);
                    binding.setGetter(getterMethodHandle);
                }
            }
        } catch (NoSuchMethodException | IllegalAccessException e) {
            log.error("Error during binding form for {}\n{}", beanType, e);
        }
    }

    private void prepareCreateItemForm(Class<T> beanType, FormFieldFactory formFieldFactory) {
        Field[] fields = beanType.getDeclaredFields();
        for (Field field : fields) {
            if (!isFieldExcluded(field)) {
                Component component = formFieldFactory.getComponentFor(field);
                createForm.add(component);
                bindings.get(field.getName()).setComponent(component);
            }
        }

        Button addButton = new Button("Add");
        addButton.addClickListener(e -> createForm.close());

        Button cancelButton = new Button("Cancel");
        cancelButton.addClickListener(e -> createForm.close());

        createForm.add(new HorizontalLayout(addButton, cancelButton));

        createButton.addClickListener(e -> createForm.open());
    }

    private void save() {
        try {
            T bean = (T) creator.invoke();
            bindings.values().forEach(binding -> {
                binding.getComponent();
            });
        } catch (Throwable throwable) {
            bus.message(Event.ERROR).withContent(ExceptionUtils.getStackTrace(throwable)).send();
        }
    }
}
