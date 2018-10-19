package pl.khuzzuk.wfrp.helper.ui.crud;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityManyToOneField;
import pl.khuzzuk.wfrp.helper.ui.crud.field.EntityOneToOneField;
import pl.khuzzuk.wfrp.helper.ui.crud.form.CollectionFormFieldFactory;
import pl.khuzzuk.wfrp.helper.ui.crud.type.DoubleTypeFieldApplier;
import pl.khuzzuk.wfrp.helper.ui.crud.type.EnumTypeFieldApplier;
import pl.khuzzuk.wfrp.helper.ui.crud.type.FloatTypeFieldApplier;
import pl.khuzzuk.wfrp.helper.ui.crud.type.IntegerTypeFieldApplier;
import pl.khuzzuk.wfrp.helper.ui.crud.type.LongTypeFieldApplier;
import pl.khuzzuk.wfrp.helper.ui.crud.type.StringTypeFieldApplier;
import pl.khuzzuk.wfrp.helper.ui.crud.type.TypeFieldApplier;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class FormFieldFactory implements InitializingBean {
    private final CollectionFormFieldFactory collectionFormFieldFactory;
    private final EntityFieldFactory entityFieldFactory;
    private List<TypeFieldApplier> typeFieldAppliers = new ArrayList<>();

    @Override
    public void afterPropertiesSet() {
        typeFieldAppliers.add(new StringTypeFieldApplier());
        typeFieldAppliers.add(new IntegerTypeFieldApplier());
        typeFieldAppliers.add(new IntegerTypeFieldApplier());
        typeFieldAppliers.add(new LongTypeFieldApplier());
        typeFieldAppliers.add(new LongTypeFieldApplier());
        typeFieldAppliers.add(new FloatTypeFieldApplier());
        typeFieldAppliers.add(new FloatTypeFieldApplier());
        typeFieldAppliers.add(new DoubleTypeFieldApplier());
        typeFieldAppliers.add(new DoubleTypeFieldApplier());
        typeFieldAppliers.add(new EnumTypeFieldApplier());
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    void bindWithComponent(Field field, AutoBindings<?> bindings, String propertyPath) {
        Class type = field.getType();
        String name = field.getName();

        Optional<TypeFieldApplier> applier = typeFieldAppliers.stream()
                .filter(a -> a.supportType(type))
                .findFirst();
        if (applier.isPresent()) {
            applier.get().apply(field, bindings, propertyPath);

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
                case DELEGATED:
                    EntityOneToOneField<?> entityField = entityFieldFactory.createWithDelegatedEditor(type, this);
                    bindings.bind(entityField, propertyPath);
                    bindings.registerFieldInitializer(field);
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
