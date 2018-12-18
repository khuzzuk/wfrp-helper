package pl.khuzzuk.wfrp.helper.ui.character;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.binder.HasDataProvider;
import com.vaadin.flow.data.converter.StringToFloatConverter;
import com.vaadin.flow.data.converter.StringToIntegerConverter;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.creature.EyeColor;
import pl.khuzzuk.wfrp.helper.model.creature.Gender;
import pl.khuzzuk.wfrp.helper.model.creature.HairColor;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.model.creature.PhysicalFeature;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;
import pl.khuzzuk.wfrp.helper.service.determinant.DeterminantService;
import pl.khuzzuk.wfrp.helper.service.determinant.ModifierService;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.crud.field.ListableEntityOneToManyField;
import pl.khuzzuk.wfrp.helper.ui.field.PersonDeterminantsField;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;
import pl.khuzzuk.wfrp.helper.ui.menu.RightMenu;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Component
@UIScope
@Tag("gm-character-view")
@Lazy
public class GMCharacterView extends WebComponent implements InitializingBean {
    private static final String NUMBER_INVALID_MESSAGE = "Please insert number";

    private final Bus<Event> bus;
    private final DeterminantService determinantService;
    private final ModifierService modifierService;
    private final RightMenu rightMenu;

    private TextField name = new TextField("Imię");
    private ComboBox<Gender> gender = new ComboBox<>("Płeć");
    private TextField age = new TextField("Wiek");
    private TextField height = new TextField("Wzrost");
    private TextField weight = new TextField("Waga");
    private ComboBox<HairColor> hairColor = new ComboBox<>("Kolor włosów");
    private ComboBox<EyeColor> eyeColor = new ComboBox<>("Kolor oczu");
    private TextArea description = new TextArea("Opis");
    private TextArea history = new TextArea("Historia");
    private PersonDeterminantsField determinantsField = new PersonDeterminantsField();

    private ListableEntityOneToManyField<PhysicalFeature> physicalFeaturesField = new ListableEntityOneToManyField<>();
    private ListableEntityOneToManyField<Skill> skillsField = new ListableEntityOneToManyField<>();

    @UIProperty
    private Div form = new Div(name, gender, age, height, weight, hairColor, eyeColor,
            description, history,
            determinantsField, physicalFeaturesField, skillsField);

    @UIProperty
    private Button saveButton = new Button("Zapisz");
    @UIProperty
    private Button cancelButton = new Button("Anuluj");

    private BeanValidationBinder<Person> binder = new BeanValidationBinder<>(Person.class);
    private Map<Class<?>, DataFieldWrapper<?>> dataProviders = new HashMap<>();
    private Person person;

    @Override
    public void afterPropertiesSet() {
        gender.setItems(EnumSet.allOf(Gender.class));
        determinantsField.init(determinantService, modifierService);

        bus.subscribingFor(Event.DATA_ALL).accept(this::refreshData).subscribe();
        registerDataProvider(HairColor.class, hairColor);
        registerDataProvider(EyeColor.class, eyeColor);
        registerDataProvider(PhysicalFeature.class, new DataFieldWrapper<>(() -> {}, physicalFeaturesField::refreshData));

        binder.bind(name, "name");
        binder.forField(age).withConverter(new StringToIntegerConverter(NUMBER_INVALID_MESSAGE)).bind("age");
        binder.forField(height).withConverter(new StringToIntegerConverter(NUMBER_INVALID_MESSAGE)).bind("height");
        binder.forField(weight).withConverter(new StringToFloatConverter(NUMBER_INVALID_MESSAGE)).bind("weight");
        binder.bind(hairColor, "hairColor");
        binder.bind(eyeColor, "eyeColor");
        binder.bind(gender, "gender");
        binder.bind(description, "description");
        binder.bind(history, "history");
        binder.forField(determinantsField).bind("determinants");
        binder.bind(physicalFeaturesField, "physicalFeatures");
        binder.bind(skillsField, "skills");

        saveButton.addClickListener(event -> save());
        cancelButton.addClickListener(event -> rightMenu.showPersons());
    }

    private <T> void registerDataProvider(Class<T> type, HasDataProvider<T> field) {
        ListDataProvider<T> dataProvider = DataProvider.ofCollection(new ArrayList<>());
        field.setDataProvider(dataProvider);
        DataFieldWrapper<T> wrapper = new DataFieldWrapper<>(dataProvider);
        registerDataProvider(type, wrapper);
    }

    private <T> void registerDataProvider(Class<T> type, DataFieldWrapper<T> wrapper) {
        dataProviders.put(type, wrapper);
        System.out.println("request for data " + type);
        bus.message(Event.FIND_ALL).withContent(type).send();
    }

    private void refreshData(QueryAllResult<?> data) {
        System.out.println("received data " + data.getType());
        if (dataProviders.containsKey(data.getType())) {
            DataFieldWrapper dataFieldWrapper = dataProviders.get(data.getType());
            dataFieldWrapper.setData(data.getItems());
            execute(dataFieldWrapper.getRefresher());
        }
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        super.onAttach(attachEvent);
        dataProviders.values().forEach(wrapper -> execute(wrapper.getRefresher()));
    }

    public void load(Person person) {
        this.person = person;
        binder.setBean(person);
    }

    private void save() {
        if (binder.validate().isOk()) {
            Person person = binder.getBean();
            bus.message(Event.SAVE).withContent(person).send();
            rightMenu.showPersons();
        }
    }
}
