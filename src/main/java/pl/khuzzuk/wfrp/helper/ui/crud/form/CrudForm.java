package pl.khuzzuk.wfrp.helper.ui.crud.form;

import com.vaadin.flow.component.dialog.Dialog;
import lombok.Getter;
import pl.khuzzuk.wfrp.helper.ui.crud.Bindings;

public abstract class CrudForm<T> extends Dialog {
    Bindings<T> bindings;
    @Getter
    private T bean;

    public void showForm() {
        open();
    }

    abstract T getFormBean();
}
