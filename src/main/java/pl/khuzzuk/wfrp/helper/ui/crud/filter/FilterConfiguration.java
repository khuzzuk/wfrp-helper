package pl.khuzzuk.wfrp.helper.ui.crud.filter;

import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.provider.ListDataProvider;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.ui.crud.ReflectionUtils;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class FilterConfiguration<T> {
    private static final MethodHandles.Lookup LOOKUP = MethodHandles.publicLookup();

    private final Class<T> type;
    private final ListDataProvider<T> dataProvider;
    private List<FilterDefinition> filterDefinitions = new ArrayList<>();

    public static <T> FilterConfiguration<T> forType(Class<T> type, ListDataProvider<T> dataProvider) {
        FilterConfiguration<T> configuration = new FilterConfiguration<>(type, dataProvider);
        configuration.registerFiltersInType();
        return configuration;
    }

    private void registerFiltersInType() {
        ReflectionUtils.getFields(type).stream()
                .filter(f -> f.isAnnotationPresent(Filter.class))
                .forEach(this::registerFilter);
    }

    private void registerFilter(Field field) {
        FilterDefinition filterDefinition = new FilterDefinition();

        MethodHandle getter = findGetter(field);
        TextField textField = new TextField(field.getName());

        filterDefinitions.add(filterDefinition);
    }

    private MethodHandle findGetter(Field field) {
        String getterName = "get" + StringUtils.capitalize(field.getName());
        MethodType getterType = MethodType.methodType(field.getType());
        try {
            return LOOKUP.findVirtual(type, getterName, getterType);
        } catch (NoSuchMethodException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
