package pl.khuzzuk.wfrp.helper.ui.crud;

public interface Bindings<T> {
    ReflectionBindings<T> add(String name, Binding<T, ?> binding);

    Binding<T, ?> get(String name, Class<?> fieldType);

    T createNewInstance() throws Throwable;
}
