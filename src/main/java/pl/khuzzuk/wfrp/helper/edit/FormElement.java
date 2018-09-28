package pl.khuzzuk.wfrp.helper.edit;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface FormElement {
    boolean exclude() default false;
    EditorType editor() default EditorType.NONE;
}
