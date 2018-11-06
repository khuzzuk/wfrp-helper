package pl.khuzzuk.wfrp.helper.ui.character;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.Race;
import pl.khuzzuk.wfrp.helper.model.creature.Gender;
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;

@RequiredArgsConstructor
@Component
@UIScope
@Tag("character-sheet")
@HtmlImport("wfrp-character-sheet-style.html")
public class CharacterSheet extends WebComponent implements InitializingBean {
    private final Bus<Event> bus;
    @UIProperty
    private Image imageFront = new Image("images/sheet_a.png", "Character sheet");
    @UIProperty
    @CSS(classNames = "cs-text-field", id = "name")
    private TextField name = new TextField();
    @UIProperty
    @CSS(classNames = "cs-combo-box", id = "race")
    private ComboBox<Race> race = new ComboBox<>();
    @UIProperty
    @CSS(classNames = "cs-combo-box", id = "gender")
    private ComboBox<Gender> gender = new ComboBox<>();

    private ListDataProvider<Race> races = DataProvider.ofCollection(new ArrayList<>());
    private Map<Class<?>, Consumer<Collection<?>>> dataRefreshers = new HashMap<>();

    @Override
    public void afterPropertiesSet() {
        race.setDataProvider(races);
        dataRefreshers.put(Race.class, data -> refreshDataProvider((Collection) data, races));

        gender.setItems(EnumSet.allOf(Gender.class));

        bus.subscribingFor(Event.DATA_ALL).accept(this::refreshData).subscribe();
        requestData(Race.class);
    }

    private <T> void refreshDataProvider(Collection<T> data, ListDataProvider<T> provider) {
        provider.getItems().clear();
        provider.getItems().addAll(data);
        provider.refreshAll();
    }

    private void requestData(Class<?>... types) {
        Arrays.stream(types).forEach(t -> bus.message(Event.FIND_ALL).withContent(t).send());
    }

    private void refreshData(QueryAllResult<?> data) {
        if (dataRefreshers.containsKey(data.getType())) {
            dataRefreshers.get(data.getType()).accept(data.getItems());
        }
    }
}
