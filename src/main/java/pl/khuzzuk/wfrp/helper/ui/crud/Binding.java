package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.AbstractField;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.invoke.MethodHandle;
import java.util.function.Supplier;

@Setter
@EqualsAndHashCode(of = "name")
@RequiredArgsConstructor
public class Binding<B, T> {
    private static final Logger log = LoggerFactory.getLogger(Binding.class);
    private static final Supplier<?> NULL_SUPPLIER = () -> null;

    private final String name;
    private final Class<B> beanType;
    private final Class<T> valueType;
    private MethodHandle getter;
    private MethodHandle setter;
    private AbstractField<? extends AbstractField<?, T>, T> component;
    private Supplier<T> defaultValue = (Supplier<T>) NULL_SUPPLIER;

    T getValue(Object bean) {
        try {
            return (T) getter.invokeExact(bean);
        } catch (Throwable throwable) {
            log.error("Error during get value on bean", throwable);
        }
        return defaultValue.get();
    }

    void setValue(B bean) {
        try {
            setter.invoke(beanType.cast(bean), valueType.cast(component.getValue()));
        } catch (Throwable throwable) {
            log.error("Error during set value on bean", throwable);
        }
    }
}
