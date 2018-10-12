package pl.khuzzuk.wfrp.helper.ui.crud;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.lang.invoke.MethodHandles;
import java.lang.reflect.Field;
import java.util.Collection;

@Slf4j
@RequiredArgsConstructor
@Component
class BindingsFactory {
    private static final MethodHandles.Lookup LOOKUP = MethodHandles.publicLookup();

    private final FormFieldFactory formFieldFactory;

    static <T> AutoBindings<T> create(Class<T> beanType, FormFieldFactory formFieldFactory) {
        AutoBindings<T> bindings = AutoBindings.createForType(beanType);
        Collection<Field> fields = ReflectionUtils.getFields(beanType);
        fields.stream()
                .filter(ExclusionFieldsUtils::canIncludeInForm)
                .forEach(field -> formFieldFactory.bindWithComponent(field, bindings, field.getName()));
        return bindings;
    }
}
