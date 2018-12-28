package pl.khuzzuk.wfrp.helper.ui.crud.form;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasComponents;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import lombok.RequiredArgsConstructor;
import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;

import java.util.function.Consumer;

@RequiredArgsConstructor
public class CrudForm<T> extends Dialog {
    private final AutoBindings<T> bindings;
    private T bean;

    private HasComponents root;

    public static <T> CrudForm<T> createFor(AutoBindings<T> bindings, Consumer<T> afterFinish) {
        CrudForm<T> form = new CrudForm<>(bindings);
        form.root = new FormLayout();
        form.add((Component) form.root);
        bindings.addFieldsTo(form.root);

        Button addButton = new Button("Apply");
        addButton.addClickListener(e -> {
            if (bindings.validate()) afterFinish.accept(form.bindings.read());
        });
        addButton.addClickListener(e -> {
            if (bindings.validate()) form.close();
        });

        Button cancelButton = new Button("Cancel");
        cancelButton.addClickListener(e -> form.close());

        form.add(new HorizontalLayout(addButton, cancelButton));
        return form;
    }

    public void showForm() {
        bean = bindings.createNewInstance();
        open();
    }

    public void showForm(T bean) {
        this.bean = bean;
        bindings.update(bean);
        open();
    }
}
