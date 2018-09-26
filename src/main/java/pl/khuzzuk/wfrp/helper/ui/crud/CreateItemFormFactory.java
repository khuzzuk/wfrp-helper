package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import pl.khuzzuk.wfrp.helper.ui.crud.form.CreateForm;

import java.util.function.Consumer;

class CreateItemFormFactory {
    public static <T> CreateForm<T> createForm(Bindings<T> bindings,
                                        Consumer<T> afterFinish) {
        CreateForm<T> createForm = CreateForm.createFor(bindings);
        bindings.addFieldsTo(createForm);

        Button addButton = new Button("Add");
        addButton.addClickListener(e -> afterFinish.accept(createForm.getBean()));
        addButton.addClickListener(e -> createForm.close());

        Button cancelButton = new Button("Cancel");
        cancelButton.addClickListener(e -> createForm.close());

        createForm.add(new HorizontalLayout(addButton, cancelButton));
        return createForm;
    }
}
