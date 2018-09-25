package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;

class CreateItemFormFactory {
    public static <T> Dialog createForm(Bindings<T> bindings,
                                        ComponentEventListener<ClickEvent<Button>> saveListener) {
        Dialog createForm = new Dialog();
        bindings.addFieldsTo(createForm);

        Button addButton = new Button("Add");
        addButton.addClickListener(saveListener);
        addButton.addClickListener(e -> createForm.close());

        Button cancelButton = new Button("Cancel");
        cancelButton.addClickListener(e -> createForm.close());

        createForm.add(new HorizontalLayout(addButton, cancelButton));
        return createForm;
    }
}
