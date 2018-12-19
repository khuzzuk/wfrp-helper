package pl.khuzzuk.wfrp.helper.ui.character;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collection;

@UIScope
@Component
@RequiredArgsConstructor
public class GMCharacterCrud extends WebComponent {
    private final GMCharacterView characterView;
    private final Bus<Event> bus;
    private final Div content;

    @CSS(classNames = {"button"}, id = "addPerson")
    private Button addPerson = new Button(VaadinIcon.PLUS.create());
    @CSS(classNames = {"button"}, id = "editPerson")
    private Button editPerson = new Button(VaadinIcon.EDIT.create());
    @CSS(classNames = {"button"}, id = "removePerson")
    private Button removePerson = new Button(VaadinIcon.DEL.create());

    @UIProperty
    private HorizontalLayout personTableButtons = new HorizontalLayout(addPerson, editPerson, removePerson);

    @UIProperty
    @CSS(classNames = "crud-grid")
    private Grid<Person> persons = new Grid<>(Person.class);

    private ListDataProvider<Person> personDataProvider = DataProvider.ofCollection(new ArrayList<>());

    @PostConstruct
    private void init() {
        bus.subscribingFor(Event.DATA_ALL).accept((QueryAllResult data) -> {
            if (data.getType().equals(Person.class)) {
                personDataProvider.getItems().clear();
                personDataProvider.getItems().addAll((Collection<Person>) data.getItems());
                execute(() -> personDataProvider.refreshAll());
                execute(() -> getUI().get().push());
            }
        }).subscribe();

        persons.getColumns().forEach(persons::removeColumn);
        persons.addColumn("name");
        persons.addColumn("gender");
        persons.setDataProvider(personDataProvider);
        persons.addSelectionListener(event -> enableEditButtons(event.getFirstSelectedItem().isPresent()));

        addPerson.addClickListener(e -> load(new Person()));

        editPerson.addClickListener(e -> load(persons.getSelectedItems().iterator().next()));
        editPerson.setEnabled(false);

        removePerson.setEnabled(false);
        removePerson.addClickListener(e -> removeSelection());

        content.removeAll();
    }

    private void load(Person person) {
        characterView.load(person);
        content.removeAll();
        content.add(characterView);
    }

    private void enableEditButtons(boolean state) {
        editPerson.setEnabled(state);
        removePerson.setEnabled(state);
    }

    private void removeSelection() {
        Person person = persons.getSelectedItems().iterator().next();
        bus.message(Event.DELETE).withContent(person).send();
    }
}
