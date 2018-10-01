package pl.khuzzuk.wfrp.helper.ui.crud.field;

import com.vaadin.flow.component.combobox.ComboBox;
import lombok.Setter;

import java.util.Collection;

public class EntityManyToOneField<T> extends ComboBox<T> {
    @Setter
    private Collection<T> sourceValues;

    public EntityManyToOneField(String label) {
        super(label);
    }

    @Override
    protected void open() {
        setItems(sourceValues);
        super.open();
    }
}
