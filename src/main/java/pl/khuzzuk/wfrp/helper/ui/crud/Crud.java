package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.grid.Grid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class Crud<T> extends WebComponent {
    private final Bus<Event> bus;

    private Grid<T> table;

    public static <T> Crud<T> forBean(Class<T> beanType, Bus<Event> bus) {
        Crud<T> crud = new Crud<>(bus);
        crud.table = new Grid<>(beanType);
        crud.add(crud.table);
        return crud;
    }
}
