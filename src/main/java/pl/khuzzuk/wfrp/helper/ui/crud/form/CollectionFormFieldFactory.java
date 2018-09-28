package pl.khuzzuk.wfrp.helper.ui.crud.form;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.ui.crud.Bindings;
import pl.khuzzuk.wfrp.helper.ui.crud.DataSubscription;
import pl.khuzzuk.wfrp.helper.ui.crud.EntityOneToManyFieldFactory;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityOneToManyField;
import pl.khuzzuk.wfrp.helper.ui.crud.field.ListableEntityOneToManyField;

import javax.persistence.Entity;
import java.lang.reflect.Field;
import java.lang.reflect.Type;

import static pl.khuzzuk.wfrp.helper.ui.crud.ReflectionUtils.collectionFromFieldType;
import static pl.khuzzuk.wfrp.helper.ui.crud.ReflectionUtils.getGenericParameterType;

@Component
@AllArgsConstructor
public class CollectionFormFieldFactory {
    private EntityOneToManyFieldFactory entityOneToManyFieldFactory;
    private Bus<Event> bus;

    public <T> void putFieldIntoForm(Field field, Bindings<T> bindings, FormFieldFactory formFieldFactory) {
        FormElement settings = field.getDeclaredAnnotation(FormElement.class);

        switch (settings.editor()) {
            case DELEGATED:
                putDelegatedEditor(field, bindings, formFieldFactory);
                break;
            case CHOOSE:
                DataSubscription<?> dataSubscription = new DataSubscription<>(getGenericParameterType(field));
                putChooseFromExisting(field, dataSubscription);
                bus.subscribingFor(Event.FIND_ALL).accept(dataSubscription::accept).subscribe();
                break;
            case NONE:
            default:
                break;
        }
    }

    private void putChooseFromExisting(Field field, DataSubscription<?> dataSubscription) {
        Class listableType = getGenericParameterType(field);
        ListableEntityOneToManyField listable = entityOneToManyFieldFactory.createListable(listableType, collectionFromFieldType(field.getType()));
        dataSubscription.setOnRefresh(listable::refreshData);
    }

    private void putDelegatedEditor(Field field, Bindings<?> bindings, FormFieldFactory formFieldFactory) {
        String name = field.getName();
        Class<?> type = field.getType();

        if (canHaveEditor(getGenericParameterType(field))) {
            EntityOneToManyField<?> entityField = entityOneToManyFieldFactory.createEditable(getGenericParameterType(field), collectionFromFieldType(type), formFieldFactory);
            bindings.bind(entityField, name);
        } else {
            throw new IllegalArgumentException(String.format("Field cannot have delegated editor: %s", field));
        }
    }

    private static boolean canHaveEditor(Type type) {
        return ((Class<?>) type).isAnnotationPresent(Entity.class);
    }
}
