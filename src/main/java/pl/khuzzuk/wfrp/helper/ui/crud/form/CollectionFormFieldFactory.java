package pl.khuzzuk.wfrp.helper.ui.crud.form;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.ui.crud.AutoBindings;
import pl.khuzzuk.wfrp.helper.ui.crud.EntityFieldFactory;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityOneToManyField;
import pl.khuzzuk.wfrp.helper.ui.crud.field.ListableEntityOneToManyField;

import javax.persistence.Entity;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.Collection;
import java.util.function.Supplier;

import static pl.khuzzuk.wfrp.helper.common.ReflectionUtils.collectionFromFieldTypeProvider;
import static pl.khuzzuk.wfrp.helper.common.ReflectionUtils.getGenericParameterType;

@Component
@AllArgsConstructor
public class CollectionFormFieldFactory {
    private EntityFieldFactory entityFieldFactory;

    public <T> void putFieldIntoForm(Field field, AutoBindings<T> bindings, FormFieldFactory formFieldFactory) {
        FormElement settings = field.getDeclaredAnnotation(FormElement.class);

        switch (settings.editor()) {
            case DELEGATED:
                putDelegatedEditor(field, bindings, formFieldFactory);
                break;
            case CHOOSE:
                Class chooseDataType = getGenericParameterType(field);
                bindings.registerEntity(chooseDataType);
                putChooseFromExisting(field, bindings);
                break;
            case NONE:
            default:
                break;
        }
    }

    @SuppressWarnings("unchecked")
    private <T> void putChooseFromExisting(Field field, AutoBindings<?> bindings) {
        Class<T> listableType = (Class<T>) getGenericParameterType(field);
        Class<? extends Collection<T>> type = (Class<? extends Collection<T>>) field.getType();

        Supplier<? extends Collection<T>> collectionSupplier = collectionFromFieldTypeProvider(type);
        ListableEntityOneToManyField<T> listable = entityFieldFactory.createListable(listableType, collectionSupplier);

        bindings.bind(listable, field.getName());
        bindings.registerDataListener(data -> {
            if (data.getType().equals(listableType)) {
                Collection<T> items = (Collection<T>) data.getItems();
                listable.refreshData(items);
            }
        });
    }

    @SuppressWarnings("unchecked")
    private <T> void putDelegatedEditor(Field field, AutoBindings<?> bindings, FormFieldFactory formFieldFactory) {
        String name = field.getName();
        Class<? extends Collection<T>> type = (Class<? extends Collection<T>>) field.getType();

        Class<T> genericParameterType = (Class<T>) getGenericParameterType(field);
        if (canHaveEditor(genericParameterType)) {
            EntityOneToManyField<T> entityField = entityFieldFactory.createWithDelegatedEditor(
                    genericParameterType, collectionFromFieldTypeProvider(type), formFieldFactory);
            bindings.bind(entityField, name);
        } else {
            throw new IllegalArgumentException(String.format("Field cannot have delegated editor: %s", field));
        }
    }

    private static boolean canHaveEditor(Type type) {
        return ((AnnotatedElement) type).isAnnotationPresent(Entity.class);
    }
}
