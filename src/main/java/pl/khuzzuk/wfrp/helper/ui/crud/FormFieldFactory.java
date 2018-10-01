package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.converter.StringToIntegerConverter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityManyToOneField;
import pl.khuzzuk.wfrp.helper.ui.crud.form.CollectionFormFieldFactory;

import javax.persistence.Entity;
import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.*;

@Slf4j
@AllArgsConstructor
@Component
public class FormFieldFactory {
    private CollectionFormFieldFactory collectionFormFieldFactory;
    private EntityOneToManyFieldFactory entityOneToManyFieldFactory;
    private Bus<Event> bus;

    @SuppressWarnings({"unchecked", "rawtypes"})
    void bindWithComponent(Field field, Bindings<?> bindings) {
        Class<?> type = field.getType();
        String name = field.getName();

        if (type.equals(String.class)) {
            bindings.bind(new TextField(name), name);

        } else if (type.equals(int.class) || type.equals(Integer.class)) {
            bindings.bind(new TextField(name), name, new StringToIntegerConverter("Please enter a number"));

        } else if (Enum.class.isAssignableFrom(type)) {
            ComboBox<Enum> enumField = new ComboBox<>(name);
            enumField.setItems(EnumSet.allOf((Class<Enum>) type));
            bindings.bind(enumField, name);

        } else if (Collection.class.isAssignableFrom(type)) {
            collectionFormFieldFactory.putFieldIntoForm(field, bindings, this);

        } else if (field.isAnnotationPresent(FormElement.class)) {
            FormElement formElementMetadata = field.getDeclaredAnnotation(FormElement.class);
            switch (formElementMetadata.editor()) {
                case CHOOSE:
                    EntityManyToOneField<?> entityChooseField = new EntityManyToOneField<>(name);
                    bus.subscribingFor(Event.DATA_ALL).<QueryAllResult>accept(data -> {
                        if (type.equals(data.getType())) {
                            entityChooseField.setSourceValues(data.getItems());
                        }
                    }).subscribe();
                    bindings.bind(entityChooseField, name);
                    break;
            }

        } else {
            throw new IllegalArgumentException(String.format("No mapping for field %s: %s", name, type));
        }
    }

    private static boolean canHaveEditor(Type type) {
        return ((Class<?>) type).isAnnotationPresent(Entity.class);
    }

    private static <V> Collection<V> collectionFromFieldType(Class<V> type) {
        if (Set.class.isAssignableFrom(type)) {
            return new HashSet<>();
        }
        if (List.class.isAssignableFrom(type)) {
            return new ArrayList<>();
        }
        return new ArrayDeque<>();
    }
}
