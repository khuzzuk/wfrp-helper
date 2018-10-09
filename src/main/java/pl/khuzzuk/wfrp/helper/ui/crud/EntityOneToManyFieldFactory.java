package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.VaadinIcon;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityOneToManyField;
import pl.khuzzuk.wfrp.helper.ui.crud.field.ListableEntityOneToManyField;
import pl.khuzzuk.wfrp.helper.ui.crud.form.CrudForm;

import java.util.ArrayList;
import java.util.Collection;
import java.util.function.Supplier;

@Component
@AllArgsConstructor
public class EntityOneToManyFieldFactory {
    public <T> EntityOneToManyField<T> createWithDelegatedEditor(Class<T> type, Supplier<Collection<T>> initialValues, FormFieldFactory formFieldFactory) {
        Bindings<T> subEntityBindings = BindingsFactory.create(type, formFieldFactory);
        EntityOneToManyField<T> entityField = new EntityOneToManyField<>(new ArrayList<>(), new ArrayList<>(), initialValues);
        CrudForm<T> form = CrudForm.createFor(subEntityBindings, entityField::addEntity);
        entityField.setOnEdit(form::showForm);

        Button button = new Button(VaadinIcon.PLUS.create());
        button.addClickListener(e -> form.showForm());
        entityField.addComponent(button);

        entityField.refreshView();
        return entityField;
    }

    public <T> ListableEntityOneToManyField<T> createListable(
            Class<T> type,
            Supplier<Collection<T>> initialValues) {
        ListableEntityOneToManyField<T> field = new ListableEntityOneToManyField<>(type, new ArrayList<>(), new ArrayList<>(), initialValues);
        field.refreshView();
        return field;
    }
}
