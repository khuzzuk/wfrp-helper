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
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.function.Consumer;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AutoBindings<T> {
    private static final MethodHandles.Lookup LOOKUP = MethodHandles.publicLookup();
    private static final MethodType CONSTRUCTOR_TYPE = MethodType.methodType(void.class);

    private Class<T> beanType;
    private Binder<T> binder;
    private List<Consumer<QueryAllResult<?>>> dataConsumers = new ArrayList<>();
    private MethodHandle constructorHandle;
    private Collection<InnerFieldInitializer> innerFieldInitializers = new ArrayList<>();
    private T bean;
    private Collection<Class<?>> registeredEntities = new HashSet<>();

    static <T> AutoBindings<T> createForType(Class<T> beanType) {
        AutoBindings<T> bindings = new AutoBindings<>();
        bindings.beanType = beanType;
        bindings.registeredEntities.add(beanType);
        bindings.binder = new Binder<>(beanType);

        try {
            bindings.constructorHandle = LOOKUP.findConstructor(beanType, CONSTRUCTOR_TYPE);
        } catch (NoSuchMethodException | IllegalAccessException e) {
            log.error(ExceptionUtils.getStackTrace(e));
        }
        return bindings;
    }

    public <E> void bind(HasValue<?, E> component, String name) {
        registerInnerFieldInitializer(name);
        binder.bind(component, name);
    }

    <E, P> void bind(HasValue<?, P> component, String name, Converter<P, E> converter) {
        registerInnerFieldInitializer(name);
        binder.forField(component)
                .withConverter(converter)
                .bind(name);
    }

    private void registerInnerFieldInitializer(String name) {
        try {
            if (name.contains(".")) {
                Field referenceField = ReflectionUtils.getFieldByName(beanType, name.substring(0, name.indexOf('.')));
                MethodType setterType = MethodType.methodType(void.class, referenceField.getType());
                String setterName = "set" + referenceField.getName().substring(0, 1).toUpperCase()
                        + referenceField.getName().substring(1);
                innerFieldInitializers.add(new InnerFieldInitializer(
                        LOOKUP.findVirtual(beanType, setterName, setterType),
                        LOOKUP.findConstructor(referenceField.getType(), CONSTRUCTOR_TYPE)));
            }
        } catch (NoSuchFieldException | IllegalAccessException | NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    @SuppressWarnings("unchecked")
    public T createNewInstance() {
        try {
            Object newBean = constructorHandle.invoke();
            for (InnerFieldInitializer initializer : innerFieldInitializers) {
                initializer.initializeField(newBean);
            }
            update((T) newBean);
            return bean;
        } catch (Throwable throwable) {
            throw new RuntimeException(throwable);
        }
    }

    public void update(T bean) {
        this.bean = bean;
        binder.removeBean();
        binder.readBean(bean);
    }

    public T read() {
        binder.validate();
        binder.writeBeanIfValid(bean);
        return bean;
    }

    public void addFieldsTo(Dialog form) {
        binder.getFields()
                .filter(Component.class::isInstance)
                .map(Component.class::cast)
                .forEach(form::add);
    }

    public void onData(QueryAllResult<?> allResult) {
        dataConsumers.forEach(c -> c.accept(allResult));
    }

    public void registerDataListener(Consumer<QueryAllResult<?>> dataConsumer) {
        dataConsumers.add(dataConsumer);
    }

    public void registerEntity(Class<?> entity) {
        registeredEntities.add(entity);
    }

    public void requestData(Consumer<Class<?>> entityRequest) {
        registeredEntities.forEach(entityRequest::accept);
    }
}
