package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.dialog.Dialog;
import lombok.RequiredArgsConstructor;

import java.lang.invoke.MethodHandle;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
class ReflectionBindings<T> {
    private final Class<T> beanType;
    private final MethodHandle constructor;
    private Map<String, Binding<T, ?>> bindings = new HashMap<>();

    public ReflectionBindings<T> add(String name, Binding<T, ?> binding) {
        bindings.put(name, binding);
        return this;
    }

    public Binding<T, ?> get(String name, Class<?> fieldType) {
        return bindings.computeIfAbsent(name, key -> new Binding<>(key, beanType, fieldType));
    }

    public T createNewInstance() {
        try {
            T bean = (T) constructor.invoke();
            fill(bean);
            return bean;
        } catch (Throwable throwable) {
            throw new RuntimeException(throwable);
        }
    }

    public void fill(T bean) {
        bindings.values().forEach(binding -> binding.setValue(bean));
    }

    public void addFieldsTo(Dialog form) {
        bindings.values().forEach(binding -> binding.addComponentTo(form));
    }
}
