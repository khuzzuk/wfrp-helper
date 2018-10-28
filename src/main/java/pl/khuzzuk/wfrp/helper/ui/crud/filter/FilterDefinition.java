package pl.khuzzuk.wfrp.helper.ui.crud.filter;

import com.vaadin.flow.component.AbstractField;
import com.vaadin.flow.component.checkbox.Checkbox;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

import java.lang.invoke.MethodHandle;
import java.util.function.Predicate;

@Builder
class FilterDefinition<T> implements Predicate<T> {
    private final MethodHandle getter;
    @Getter(AccessLevel.PACKAGE)
    private final AbstractField<?, ?> field;

    @Override
    public boolean test(T t) {
        Object criteria = field.getValue();

        if (criteria == null || StringUtils.isBlank(criteria.toString())) {
            return true;
        }

        Object value = getValue(t);
        return criteria instanceof Boolean && field instanceof Checkbox
                ? ((Checkbox) field).isIndeterminate() || criteria.equals(value)
                : StringUtils.startsWithIgnoreCase(value.toString(), criteria.toString());
    }

    private Object getValue(T t) {
        try {
            return getter.invoke(t);
        } catch (Throwable e) {
            throw new FilterGetterException(e);
        }
    }
}
