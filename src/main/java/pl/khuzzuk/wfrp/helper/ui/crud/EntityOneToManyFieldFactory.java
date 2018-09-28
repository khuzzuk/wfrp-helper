package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.VaadinIcon;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityOneToManyField;
import pl.khuzzuk.wfrp.helper.ui.crud.form.CrudForm;

import java.util.ArrayList;
import java.util.Collection;

@Component
@AllArgsConstructor
public class EntityOneToManyFieldFactory {
    public <T> EntityOneToManyField<T> create(Class<T> type, Collection<T> initialValues, FormFieldFactory formFieldFactory) {
        Bindings<T> subEntityBindings = BindingsFactory.create(type, formFieldFactory);
        EntityOneToManyField<T> entityField = new EntityOneToManyField<>(new ArrayList<>(), initialValues, new ArrayList<>());
        CrudForm<T> form = CrudForm.createFor(subEntityBindings, entityField::addEntity);
        entityField.setOnEdit(form::showForm);

        entityField.setValue(initialValues);

        Button button = new Button(VaadinIcon.PLUS.create());
        button.addClickListener(e -> form.showForm());
        entityField.addComponent(button);

        return entityField;
    }
}
