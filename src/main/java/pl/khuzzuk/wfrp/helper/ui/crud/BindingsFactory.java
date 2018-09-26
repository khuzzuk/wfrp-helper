package pl.khuzzuk.wfrp.helper.ui.crud;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.lang.invoke.MethodHandles;
import java.lang.reflect.Field;
import java.util.Arrays;

@Slf4j
@RequiredArgsConstructor
@Component
class BindingsFactory {
    private static final MethodHandles.Lookup LOOKUP = MethodHandles.publicLookup();

    private final FormFieldFactory formFieldFactory;

    static <T> Bindings<T> create(Class<T> beanType, FormFieldFactory formFieldFactory) {
        Bindings<T> bindings = AutoBindings.createForType(beanType);
        Field[] fields = beanType.getDeclaredFields();
        Arrays.stream(fields)
                .filter(ExclusionFieldsUtils::canIncludeInForm)
                .forEach(field -> formFieldFactory.bindWithComponent(field, bindings));
        return bindings;
    }
}
