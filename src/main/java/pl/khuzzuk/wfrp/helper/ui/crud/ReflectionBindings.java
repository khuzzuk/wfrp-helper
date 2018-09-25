package pl.khuzzuk.wfrp.helper.ui.crud;

import lombok.RequiredArgsConstructor;

import java.lang.invoke.MethodHandle;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
class ReflectionBindings<T> implements Bindings<T> {
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

    public T createNewInstance() throws Throwable {
        return (T) constructor.invokeExact();
    }
}
