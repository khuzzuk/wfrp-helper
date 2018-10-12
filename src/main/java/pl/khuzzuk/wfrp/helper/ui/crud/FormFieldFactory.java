package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.converter.StringToDoubleConverter;
import com.vaadin.flow.data.converter.StringToFloatConverter;
import com.vaadin.flow.data.converter.StringToIntegerConverter;
import com.vaadin.flow.data.converter.StringToLongConverter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityManyToOneField;
import pl.khuzzuk.wfrp.helper.ui.crud.form.CollectionFormFieldFactory;

import java.lang.reflect.Field;
import java.util.Collection;
import java.util.EnumSet;

@Slf4j
@AllArgsConstructor
@Component
public class FormFieldFactory {
    private CollectionFormFieldFactory collectionFormFieldFactory;

    @SuppressWarnings({"unchecked", "rawtypes"})
    void bindWithComponent(Field field, AutoBindings<?> bindings, String propertyPath) {
        Class<?> type = field.getType();
        String name = field.getName();

        if (type.equals(String.class)) {
            bindings.bind(new TextField(name), propertyPath);

        } else if (type.equals(int.class) || type.equals(Integer.class)) {
            bindings.bind(new TextField(name), propertyPath, new StringToIntegerConverter("Please enter a natural number"));

        } else if (type.equals(long.class) || type.equals(Long.class)) {
            bindings.bind(new TextField(name), propertyPath, new StringToLongConverter("Please enter a natural number"));

        } else if (type.equals(float.class) || type.equals(Float.class)) {
            bindings.bind(new TextField(name), propertyPath, new StringToFloatConverter("Please enter a number"));

        } else if (type.equals(double.class) || type.equals(Double.class)) {
            bindings.bind(new TextField(name), propertyPath, new StringToDoubleConverter("Please enter a number"));

        } else if (Enum.class.isAssignableFrom(type)) {
            ComboBox<Enum> enumField = new ComboBox<>(name);
            enumField.setItems(EnumSet.allOf((Class<Enum>) type));
            bindings.bind(enumField, propertyPath);

        } else if (Collection.class.isAssignableFrom(type)) {
            collectionFormFieldFactory.putFieldIntoForm(field, bindings, this);

        } else if (field.isAnnotationPresent(FormElement.class)) {
            FormElement formElementMetadata = field.getDeclaredAnnotation(FormElement.class);
            switch (formElementMetadata.editor()) {
                case CHOOSE:
                    EntityManyToOneField<?> entityChooseField = new EntityManyToOneField<>(name);
                    bindings.registerDataListener(data -> {
                                if (type.equals(data.getType())) {
                                    Collection items = data.getItems();
                                    entityChooseField.setSourceValues(items);
                                }
                            });
                    bindings.registerEntity(type);
                    bindings.bind(entityChooseField, propertyPath);
                    break;
                case EMBEDDED:
                    Collection<Field> fields = ReflectionUtils.getFields(type);
                    fields.forEach(f -> bindWithComponent(f, bindings, propertyPath + "." + f.getName()));
                    break;
            }

        } else {
            throw new IllegalArgumentException(String.format("No mapping for field %s: %s", name, type));
        }
    }
}
