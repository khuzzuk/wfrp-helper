package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.AbstractField;
import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;

import java.lang.reflect.Field;
import java.util.Map;

import static pl.khuzzuk.wfrp.helper.ui.crud.ExclusionFieldsUtils.isFieldExcluded;

class CreateItemFormFactory {
    public static <T> Dialog createForm(Class<T> beanType,
                                        FormFieldFactory formFieldFactory,
                                        Map<String, Binding<T, ?>> bindings,
                                        ComponentEventListener<ClickEvent<Button>> saveListener) {
        Dialog createForm = new Dialog();
        Field[] fields = beanType.getDeclaredFields();
        for (Field field : fields) {
            if (!isFieldExcluded(field)) {
                AbstractField component = formFieldFactory.getComponentFor(field);
                createForm.add(component);
                bindings.get(field.getName()).setComponent(component);
            }
        }

        Button addButton = new Button("Add");
        addButton.addClickListener(saveListener);
        addButton.addClickListener(e -> createForm.close());

        Button cancelButton = new Button("Cancel");
        cancelButton.addClickListener(e -> createForm.close());

        createForm.add(new HorizontalLayout(addButton, cancelButton));
        return createForm;
    }
}
