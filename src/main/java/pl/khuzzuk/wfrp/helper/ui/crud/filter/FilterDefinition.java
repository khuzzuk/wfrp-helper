package pl.khuzzuk.wfrp.helper.ui.crud.filter;

import com.vaadin.flow.component.textfield.TextField;
import lombok.Builder;
import org.apache.commons.lang3.StringUtils;

import java.lang.invoke.MethodHandle;
import java.util.function.Predicate;

@Builder
class FilterDefinition<T> implements Predicate<T> {
    private final MethodHandle getter;
    private final TextField field;

    @Override
    public boolean test(T t) {
        String criteria = field.getValue();
        try {
            String value = getter.invoke(t).toString();
            return StringUtils.startsWithIgnoreCase(value, criteria);
        } catch (Throwable e) {
            throw new FilterGetterException(e);
        }
    }
}
