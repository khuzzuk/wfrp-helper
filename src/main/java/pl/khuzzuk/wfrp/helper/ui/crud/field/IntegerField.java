package pl.khuzzuk.wfrp.helper.ui.crud.field;

import com.vaadin.flow.component.textfield.GeneratedVaadinTextField;

public class IntegerField extends GeneratedVaadinTextField<IntegerField, Integer> {
    public IntegerField(String name) {
        super(0, 0, true);
        setName(name);
    }
}
