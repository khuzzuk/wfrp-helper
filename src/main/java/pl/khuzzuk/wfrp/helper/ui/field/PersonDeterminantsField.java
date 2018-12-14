package pl.khuzzuk.wfrp.helper.ui.field;

import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.shared.Registration;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import pl.khuzzuk.wfrp.helper.model.creature.PersonDeterminants;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.model.rule.DeterminantType;
import pl.khuzzuk.wfrp.helper.service.determinant.DeterminantService;
import pl.khuzzuk.wfrp.helper.service.determinant.ModifierService;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;

import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.BATTLE;
import static pl.khuzzuk.wfrp.helper.model.rule.DeterminantType.SPEED;

@Tag("person-determinants")
public class PersonDeterminantsField extends HorizontalLayout
        implements HasValue<HasValue.ValueChangeEvent<PersonDeterminants>, PersonDeterminants> {
    private DeterminantService determinantService;
    private ModifierService modifierService;

    private List<ValueChangeListener<? super ValueChangeEvent<PersonDeterminants>>> valueChangeListeners = new ArrayList<>();

    private TextField speed = new TextField("Sp");
    private FlexLayout speedExtensions = new FlexLayout();
    private Label speedExtensionsLimit = new Label();
    private Div speedExtensionsGroup = new Div(speedExtensions, speedExtensionsLimit);
    private Label speedValue = new Label();
    private VerticalLayout speedGroup = new VerticalLayout(speed, speedExtensionsGroup, speedValue);

    private TextField battle = new TextField("B");
    private TextField shooting = new TextField("Sh");
    private TextField strangth = new TextField("St");
    private TextField durability = new TextField("Du");
    private TextField health = new TextField("H");
    private TextField initiative = new TextField("I");
    private TextField attack = new TextField("A");
    private TextField dexterity = new TextField("Dx");
    private TextField leaderSkill = new TextField("LS");
    private TextField intelligence = new TextField("Int");
    private TextField control = new TextField("C");
    private TextField will = new TextField("W");
    private TextField charisma = new TextField("Ch");

    private PersonDeterminants personDeterminants = new PersonDeterminants();

    private EnumMap<DeterminantType, DeterminantGroupField> determinants = new EnumMap<>(DeterminantType.class);

    public void init(DeterminantService determinantService, ModifierService modifierService) {
        this.determinantService = determinantService;
        this.modifierService = modifierService;
        determinants.put(SPEED, new DeterminantGroupField("Sp", SPEED));
        determinants.put(BATTLE, new DeterminantGroupField("B", BATTLE));

        determinants.values().stream()
                .peek(DeterminantGroupField::register)
                .map(DeterminantGroupField::getGroup)
                .forEach(this::add);
    }

    @Override
    public void setValue(PersonDeterminants value) {
        personDeterminants = value;
        determinants.entrySet().stream()
                .forEach(entry -> setValueForBasicDeterminant(
                        determinantService.findDeterminantByType(value, entry.getKey()), entry.getValue()));
    }

    private void setValueForBasicDeterminant(Determinant determinant, DeterminantGroupField determinantGroupField) {
        String baseValue = String.valueOf(determinant.getValue());
        String professionExtensionLimit = "+" + determinantService.getProfessionExtensionsLimit(determinant);
        String finalValue = String.valueOf(determinantService.calculateFinalValue(determinant));

        determinantGroupField.getBaseValue().setValue(baseValue);
        determinantGroupField.getExtensionsLimit().setText(professionExtensionLimit);
        determinantGroupField.getFinalValue().setText(finalValue);
    }

    @Override
    public PersonDeterminants getValue() {
        return personDeterminants;
    }

    @Override
    public Registration addValueChangeListener(ValueChangeListener<? super ValueChangeEvent<PersonDeterminants>> listener) {
        valueChangeListeners.add(listener);
        return () -> valueChangeListeners.remove(listener);
    }

    @Override
    public void setReadOnly(boolean readOnly) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isReadOnly() {
        return false;
    }

    @Override
    public void setRequiredIndicatorVisible(boolean requiredIndicatorVisible) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isRequiredIndicatorVisible() {
        return false;
    }

    @RequiredArgsConstructor(access = AccessLevel.PRIVATE)
    @Getter(AccessLevel.PRIVATE)
    private class DeterminantGroupField {
        private final String name;
        private final DeterminantType determinantType;
        private TextField baseValue = new TextField();
        private FlexLayout extensionLayout = new FlexLayout();
        private Label extensionsLimit = new Label();
        private Div extensionGroup = new Div(extensionLayout, extensionsLimit);
        private Label finalValue = new Label();
        private VerticalLayout group = new VerticalLayout(baseValue, extensionGroup, finalValue);

        private void register() {
            baseValue.setLabel(name);
            baseValue.addValueChangeListener(event -> {
                if (baseValue.isInvalid()) {
                    return;
                }

                Determinant determinant = determinantService.findDeterminantByType(personDeterminants, determinantType);
                determinant.setValue(Integer.valueOf(baseValue.getValue()));

/* TODO in extensions and other
                Modifier regularModifier = modifierService.getOrCreateRegularModifier(determinant);
                regularModifier.setValue(Integer.valueOf(baseValue.getValue()));
*/
            });
        }
    }
}
