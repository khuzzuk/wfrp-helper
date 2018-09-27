package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.converter.Converter;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.exception.ExceptionUtils;

import java.lang.invoke.MethodHandle;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
class AutoBindings<T> implements Bindings<T> {
    private Binder<T> binder;
    MethodHandle constructorHandle;
    T bean;

    static <T> AutoBindings<T> createForType(Class<T> beanType) {
        AutoBindings<T> bindings = new AutoBindings<>();
        bindings.binder = new Binder<>(beanType);

        try {
            bindings.constructorHandle = LOOKUP.findConstructor(beanType, CONSTRUCTOR_TYPE);
        } catch (NoSuchMethodException | IllegalAccessException e) {
            log.error(ExceptionUtils.getStackTrace(e));
        }
        return bindings;
    }

    @Override
    public <E> void bind(HasValue<?, E> component, String name) {
        binder.bind(component, name);
    }

    @Override
    public <E, P> void bind(HasValue<?, P> component, String name, Converter<P, E> converter) {
        binder.forField(component)
                .withConverter(converter)
                .bind(name);
    }

    @Override
    public T createNewInstance() {
        try {
            bean = (T) constructorHandle.invoke();
            binder.readBean(bean);
            return bean;
        } catch (Throwable throwable) {
            throw new RuntimeException(throwable);
        }
    }

    @Override
    public void update(T bean) {
        this.bean = bean;
        binder.readBean(bean);
    }

    @Override
    public T read() {
        binder.validate();
        binder.writeBeanIfValid(bean);
        return bean;
    }

    @Override
    public void addFieldsTo(Dialog form) {
        binder.getFields()
                .filter(Component.class::isInstance)
                .map(Component.class::cast)
                .forEach(form::add);
    }
}
