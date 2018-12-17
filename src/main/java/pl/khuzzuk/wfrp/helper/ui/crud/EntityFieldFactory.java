package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.VaadinIcon;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityOneToManyField;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityOneToOneField;
import pl.khuzzuk.wfrp.helper.ui.crud.field.ListableEntityOneToManyField;
import pl.khuzzuk.wfrp.helper.ui.crud.form.CrudForm;

import java.util.ArrayList;
import java.util.Collection;
import java.util.function.Supplier;

@Component
@AllArgsConstructor
public class EntityFieldFactory {
    public <T> EntityOneToManyField<T> createWithDelegatedEditor(Class<T> type, Supplier<Collection<T>> initialValues, FormFieldFactory formFieldFactory) {
        AutoBindings<T> subEntityBindings = BindingsFactory.create(type, formFieldFactory);
        EntityOneToManyField<T> entityField = new EntityOneToManyField<>(new ArrayList<>(), new ArrayList<>(), initialValues);
        CrudForm<T> form = CrudForm.createFor(subEntityBindings, entityField::addEntity);
        entityField.setOnEdit(form::showForm);
        entityField.setName(type.getSimpleName());

        Button button = new Button(VaadinIcon.PLUS.create());
        button.addClickListener(e -> form.showForm());
        entityField.addCustomComponent(button);

        entityField.refreshView();
        return entityField;
    }

    <T> EntityOneToOneField<T> createWithDelegatedEditor(Class<T> type, FormFieldFactory formFieldFactory) {
        AutoBindings<T> subEntityBindings = BindingsFactory.create(type, formFieldFactory);
        EntityOneToOneField<T> field = new EntityOneToOneField<>();
        CrudForm<T> form = CrudForm.createFor(subEntityBindings, field::setValue);
        field.addClickListener(e -> form.showForm(field.getValue()));
        return field;
    }

    public <T> ListableEntityOneToManyField<T> createListable(
            Class<T> type,
            Supplier<Collection<T>> initialValues) {
        ListableEntityOneToManyField<T> field = new ListableEntityOneToManyField<>(new ArrayList<>(), new ArrayList<>(), initialValues);
        field.refreshView();
        return field;
    }
}
