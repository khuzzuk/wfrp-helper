package pl.khuzzuk.wfrp.helper.ui.character;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.binder.HasDataProvider;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.creature.EyeColor;
import pl.khuzzuk.wfrp.helper.model.creature.Gender;
import pl.khuzzuk.wfrp.helper.model.creature.HairColor;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Component
@UIScope
@Tag("gm-character-view")
public class GMCharacterView extends WebComponent implements InitializingBean {
    private final Bus<Event> bus;

    private BeanValidationBinder<Person> binder = new BeanValidationBinder<>(Person.class);
    private TextField name = new TextField("Name");
    private ComboBox<Gender> gender = new ComboBox<>();
    private TextField age = new TextField("Age");
    private TextField height = new TextField("Height");
    private TextField weight = new TextField("Weight");
    private ComboBox<HairColor> hairColor = new ComboBox<>("Hair color");
    private ComboBox<EyeColor> eyeColor = new ComboBox<>("Eye color");
    private Map<Class<?>, ListDataProvider<?>> dataProviders = new HashMap<>();

    @Override
    public void afterPropertiesSet() {
        gender.setItems(EnumSet.allOf(Gender.class));

        bus.subscribingFor(Event.DATA_ALL).accept(this::refreshData).subscribe();
        registerDataProvider(HairColor.class, hairColor);
        registerDataProvider(EyeColor.class, eyeColor);

        binder.forField(name)
                .bind(Person::getName, Person::setName);
        binder.bind(age, "age");
        binder.bind(height, "height");
        binder.bind(weight, "weight");
    }

    private <T> void registerDataProvider(Class<T> type, HasDataProvider<T> field) {
        ListDataProvider<T> dataProvider = DataProvider.ofCollection(new ArrayList<>());
        field.setDataProvider(dataProvider);
        dataProviders.put(type, dataProvider);
        bus.message(Event.FIND_ALL).withContent(type).send();
    }

    private void refreshData(QueryAllResult<?> data) {
        if (dataProviders.containsKey(data.getType())) {
            ListDataProvider dataProvider = dataProviders.get(data.getType());
            dataProvider.getItems().clear();
            dataProvider.getItems().addAll(data.getItems());
        }
    }
}
