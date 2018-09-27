package pl.khuzzuk.wfrp.helper.ui.crud.form;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import lombok.RequiredArgsConstructor;
import pl.khuzzuk.wfrp.helper.ui.crud.Bindings;

import java.util.function.Consumer;

@RequiredArgsConstructor
public class CrudForm<T> extends Dialog {
    private final Bindings<T> bindings;
    private T bean;

    public static <T> CrudForm<T> createFor(Bindings<T> bindings, Consumer<T> afterFinish) {
        CrudForm<T> form = new CrudForm<>(bindings);
        bindings.addFieldsTo(form);

        Button addButton = new Button("Apply");
        addButton.addClickListener(e -> afterFinish.accept(form.bindings.read()));
        addButton.addClickListener(e -> form.close());

        Button cancelButton = new Button("Cancel");
        cancelButton.addClickListener(e -> form.close());

        form.add(new HorizontalLayout(addButton, cancelButton));
        return form;
    }

    public void showForm() {
        bean = bindings.createNewInstance();
        bindings.update(bean);
        open();
    }

    public void showForm(T bean) {
        this.bean = bean;
        bindings.update(bean);
        open();
    }
}
