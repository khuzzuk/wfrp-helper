package pl.khuzzuk.wfrp.helper.ui.crud;

import lombok.AllArgsConstructor;

import java.lang.invoke.MethodHandle;

@AllArgsConstructor
class InnerFieldInitializer {
    private MethodHandle setter;
    private MethodHandle constructor;

    void initializeField(Object bean) throws Throwable {
        Object initialized = constructor.invoke();
        setter.invoke(bean, initialized);
    }
}
