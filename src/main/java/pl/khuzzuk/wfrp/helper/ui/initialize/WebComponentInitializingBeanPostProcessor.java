package pl.khuzzuk.wfrp.helper.ui.initialize;

import com.vaadin.flow.component.HasComponents;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;

@Component
class WebComponentInitializingBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        if (bean instanceof HasComponents) {
            ComponentInitialization.initializeComponents((HasComponents) bean);
        }
        return bean;
    }
}
