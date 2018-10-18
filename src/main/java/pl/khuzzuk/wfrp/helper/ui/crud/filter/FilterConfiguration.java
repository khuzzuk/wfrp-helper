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
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class FilterConfiguration<T> {
    private static final MethodHandles.Lookup LOOKUP = MethodHandles.publicLookup();

    private final Class<T> type;
    private final ListDataProvider<T> dataProvider;
    private List<FilterDefinition<T>> filterDefinitions = new ArrayList<>();

    public static <T> FilterConfiguration<T> forType(Class<T> type, ListDataProvider<T> dataProvider) {
        FilterConfiguration<T> configuration = new FilterConfiguration<>(type, dataProvider);
        configuration.registerFiltersInType();
        return configuration;
    }

    public Collection<TextField> getFilterFields() {
        return filterDefinitions.stream()
                .map(FilterDefinition::getField).collect(Collectors.toList());
    }

    private void registerFiltersInType() {
        ReflectionUtils.getFields(type).stream()
                .filter(f -> f.isAnnotationPresent(Filter.class))
                .forEach(this::registerFilter);

        dataProvider.setFilter(this::test);
    }

    private void registerFilter(Field field) {
        MethodHandle getter = findGetter(field);
        TextField textField = new TextField(field.getName());
        textField.addValueChangeListener(event -> dataProvider.refreshAll());

        filterDefinitions.add(FilterDefinition.<T>builder()
                .getter(getter)
                .field(textField)
                .build());
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

    private boolean test(T t) {
        return filterDefinitions.stream().allMatch(def -> def.test(t));
    }
}
