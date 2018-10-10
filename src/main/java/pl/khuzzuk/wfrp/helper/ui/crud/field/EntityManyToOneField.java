package pl.khuzzuk.wfrp.helper.ui.crud.field;

import com.vaadin.flow.component.combobox.ComboBox;

import java.util.Collection;

public class EntityManyToOneField<T> extends ComboBox<T> {
    private Collection<T> sourceValues;

    public EntityManyToOneField(String label) {
        super(label);
    }

    public void setSourceValues(Collection<T> sourceValues) {
        this.sourceValues = sourceValues;
        setItems(sourceValues);
    }
}
