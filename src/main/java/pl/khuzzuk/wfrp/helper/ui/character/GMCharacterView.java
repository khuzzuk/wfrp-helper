package pl.khuzzuk.wfrp.helper.ui.character;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.icon.VaadinIcon;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.creature.EyeColor;
import pl.khuzzuk.wfrp.helper.model.creature.Gender;
import pl.khuzzuk.wfrp.helper.model.creature.HairColor;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.model.creature.PhysicalFeature;
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
public class GMCharacterView extends WebComponent implements InitializingBean {
    private static final String NUMBER_INVALID_MESSAGE = "Please insert number";

    private final Bus<Event> bus;
    private final DeterminantService determinantService;
    private final ModifierService modifierService;
    @Lazy
    @Autowired
    private RightMenu rightMenu;

    @UIProperty
    private TextField name = new TextField("Name");
    @UIProperty
    private ComboBox<Gender> gender = new ComboBox<>("Sex");
    @UIProperty
    private TextField age = new TextField("Age");
    @UIProperty
    private TextField height = new TextField("Height");
    @UIProperty
    private TextField weight = new TextField("Weight");
    @UIProperty
    private ComboBox<HairColor> hairColor = new ComboBox<>("Hair color");
    @UIProperty
    private ComboBox<EyeColor> eyeColor = new ComboBox<>("Eye color");
    @UIProperty
    private PersonDeterminantsField determinantsField = new PersonDeterminantsField();
    @UIProperty
    private ListableEntityOneToManyField<PhysicalFeature> physicalFeaturesField =
            new ListableEntityOneToManyField<>(PhysicalFeature.class, new ArrayList<>(), new ArrayList<>(), ArrayList::new);

    @UIProperty
    private Button saveButton = new Button(VaadinIcon.ENTER.create());

    private BeanValidationBinder<Person> binder = new BeanValidationBinder<>(Person.class);
    private Map<Class<?>, ListDataProvider<?>> dataProviders = new HashMap<>();
    private Person person;

    @Override
    public void afterPropertiesSet() {
        gender.setItems(EnumSet.allOf(Gender.class));
        determinantsField.init(determinantService, modifierService);

        bus.subscribingFor(Event.DATA_ALL).accept(this::refreshData).subscribe();
        registerDataProvider(HairColor.class, hairColor);
        registerDataProvider(EyeColor.class, eyeColor);
        registerDataProvider(PhysicalFeature.class, physicalFeaturesField);

        binder.bind(name, "name");
        binder.forField(age).withConverter(new StringToIntegerConverter(NUMBER_INVALID_MESSAGE)).bind("age");
        binder.forField(height).withConverter(new StringToIntegerConverter(NUMBER_INVALID_MESSAGE)).bind("height");
        binder.forField(weight).withConverter(new StringToFloatConverter(NUMBER_INVALID_MESSAGE)).bind("weight");
        binder.bind(hairColor, "hairColor");
        binder.bind(eyeColor, "eyeColor");
        binder.bind(gender, "gender");
        binder.forField(determinantsField).bind("determinants");
        binder.bind(physicalFeaturesField, "physicalFeatures");

        saveButton.addClickListener(event -> save());
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
            dataProvider.refreshAll();
        }
    }

    public void load(Person person) {
        this.person = person;
        binder.setBean(person);
    }

    private void save() {
        Person person = binder.getBean();
        bus.message(Event.SAVE).withContent(person).send();
        rightMenu.showPersons();
    }
}
