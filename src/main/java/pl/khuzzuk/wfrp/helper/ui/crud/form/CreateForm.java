package pl.khuzzuk.wfrp.helper.ui.crud.form;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import pl.khuzzuk.wfrp.helper.ui.crud.Bindings;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CreateForm<T> extends CrudForm<T> {

    public static <T> CreateForm<T> createFor(Bindings<T> bindings) {
        CreateForm<T> form = new CreateForm<>();
        form.bindings = bindings;
        return form;
    }

    @Override
    T getFormBean() {
        return bindings.createNewInstance();
    }
}
