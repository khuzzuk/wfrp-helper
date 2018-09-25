package pl.khuzzuk.wfrp.helper.ui.crud;

class EmptyBindings<T> implements Bindings<T> {
    @Override
    public ReflectionBindings<T> add(String name, Binding<T, ?> binding) {
        return null;
    }

    @Override
    public Binding<T, ?> get(String name, Class<?> fieldType) {
        return null;
    }

    @Override
    public T createNewInstance() throws Throwable {
        return null;
    }
}
