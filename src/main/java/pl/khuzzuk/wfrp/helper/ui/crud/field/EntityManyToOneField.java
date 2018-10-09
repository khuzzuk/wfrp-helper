package pl.khuzzuk.wfrp.helper.ui.crud.field;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.data.provider.ListDataProvider;

import java.util.Collection;

public class EntityManyToOneField<T> extends ComboBox<T> {
    private ListDataProvider<T> dataProvider;

    public EntityManyToOneField(String label) {
        super(label);
    }

    public void setSourceValues(Collection<T> sourceValues) {
        setItems(sourceValues);
    }
}
