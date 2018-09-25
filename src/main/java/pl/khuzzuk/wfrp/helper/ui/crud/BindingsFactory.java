package pl.khuzzuk.wfrp.helper.ui.crud;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;
import java.lang.reflect.Field;

import static pl.khuzzuk.wfrp.helper.ui.crud.ExclusionFieldsUtils.isFieldExcluded;

@Slf4j
class BindingsFactory {
    private static final MethodHandles.Lookup LOOKUP = MethodHandles.publicLookup();

    static <T> Bindings<T> create(Class<T> beanType) {
        try {
            MethodType constructor = MethodType.methodType(void.class);
            MethodHandle constructorHandle = LOOKUP.findConstructor(beanType, constructor);
            ReflectionBindings<T> bindings = new ReflectionBindings<>(beanType, constructorHandle);

            Field[] fields = beanType.getDeclaredFields();
            for (Field field : fields) {
                if (!isFieldExcluded(field)) {
                    String fieldName = field.getName();
                    Binding<T, ?> binding = new Binding<>(fieldName, beanType, field.getType());

                    String setterName = "set" + StringUtils.capitalize(fieldName);
                    MethodType setterMethodType = MethodType.methodType(void.class, field.getType());
                    MethodHandle setterMethodHandle = LOOKUP.findVirtual(beanType, setterName, setterMethodType);
                    binding.setSetter(setterMethodHandle);

                    String getterName = "get" + StringUtils.capitalize(fieldName);
                    MethodType getterMethodType = MethodType.methodType(field.getType());
                    MethodHandle getterMethodHandle = LOOKUP.findVirtual(beanType, getterName, getterMethodType);
                    binding.setGetter(getterMethodHandle);

                    bindings.add(fieldName, binding);
                }
            }
            return bindings;
        } catch (NoSuchMethodException | IllegalAccessException e) {
            log.error("Error during binding form for {}\n{}", beanType, e);
        }

        return new EmptyBindings<>();
    }
}
