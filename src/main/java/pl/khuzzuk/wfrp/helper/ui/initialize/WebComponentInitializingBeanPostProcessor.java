package pl.khuzzuk.wfrp.helper.ui.initialize;

import com.vaadin.flow.component.HasComponents;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.ui.CrudsDataListenerList;
import pl.khuzzuk.wfrp.helper.ui.crud.DeleteListener;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;
import pl.khuzzuk.wfrp.helper.common.ReflectionUtils;
import pl.khuzzuk.wfrp.helper.ui.crud.RefreshDataListener;
import pl.khuzzuk.wfrp.helper.ui.crud.SaveListener;

import java.lang.reflect.Field;
import java.util.Arrays;

@RequiredArgsConstructor
@Component
class WebComponentInitializingBeanPostProcessor implements BeanPostProcessor {
    private final FormFieldFactory formFieldFactory;
    private final SaveListener commonSaveListener;
    private final DeleteListener commonDeleteListener;
    private final RefreshDataListener commonRefreshDataListener;
    private final CrudsDataListenerList listenerList;

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        if (bean.getClass().isAnnotationPresent(HasCrud.class)) {
            initializeCrudFields(bean);
        }

        if (bean instanceof HasComponents) {
            ComponentInitialization.initializeComponents((HasComponents) bean);
        }
        return bean;
    }

    private void initializeCrudFields(Object bean) {
        Arrays.stream(bean.getClass().getDeclaredFields())
                .filter(f -> f.isAnnotationPresent(CrudField.class))
                .forEach(f -> initializeCrudField(f, bean));
    }

    @SneakyThrows(IllegalAccessException.class)
    private void initializeCrudField(Field field, Object bean) {
        Class crudBeanType = ReflectionUtils.getGenericParameterType(field);
        pl.khuzzuk.wfrp.helper.ui.crud.Crud crud = pl.khuzzuk.wfrp.helper.ui.crud.Crud.forBean(crudBeanType, formFieldFactory);

        crud.onSave(commonSaveListener);
        crud.onDelete(commonDeleteListener);
        crud.onRefreshRequest(commonRefreshDataListener);
        listenerList.addCrud(crud);
        crud.requestData();
        ComponentInitialization.initializeComponents(crud);

        field.setAccessible(true);
        field.set(bean, crud);
    }
}
