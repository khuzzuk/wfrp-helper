package pl.khuzzuk.wfrp.helper.ui.initialize;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasComponents;
import com.vaadin.flow.component.HasStyle;
import lombok.SneakyThrows;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.jooq.lambda.Seq;

import java.lang.reflect.Field;

@UtilityClass
public class ComponentInitialization {
    public static void initializeComponents(HasComponents container) {
        if (container instanceof HasStyle) {
            componentInitialization((HasStyle) container);
        }

        Field[] declaredFields = container.getClass().getDeclaredFields();

        Seq.of(declaredFields)
                .filter(f -> f.isAnnotationPresent(UIProperty.class))
                .peek(f -> f.setAccessible(true))
                .forEach(field -> initializeComponent(field, container));

        Seq.of(declaredFields)
                .filter(f -> f.isAnnotationPresent(CSS.class))
                .peek(f -> f.setAccessible(true))
                .forEach(field -> applyCss(field, container));
    }

    private static void componentInitialization(HasStyle component) {
        if (component.getClass().isAnnotationPresent(CSS.class)) {
            CSS css = component.getClass().getDeclaredAnnotation(CSS.class);
            if (StringUtils.isNotBlank(css.id())) {
                ((Component) component).setId(css.id());
            }
            component.addClassNames(css.classNames());
        }
    }

    @SneakyThrows(IllegalAccessException.class)
    private static void initializeComponent(Field componentField, HasComponents owner) {
        owner.add((Component) componentField.get(owner));
    }

    @SneakyThrows(IllegalAccessException.class)
    private static void applyCss(Field field, Object owner) {
        CSS css = field.getDeclaredAnnotation(CSS.class);
        Component component = (Component) field.get(owner);
        component.setId(css.id());
        if (component instanceof HasStyle) {
            HasStyle styleComponent = (HasStyle) component;
            styleComponent.addClassNames(css.classNames());
        }
    }
}
