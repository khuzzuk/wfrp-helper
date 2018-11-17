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
import pl.khuzzuk.wfrp.helper.model.creature.PersonDeterminants;

@Tag("person-determinants")
public class PersonDeterminantsField extends HorizontalLayout
        implements HasValue<HasValue.ValueChangeEvent<PersonDeterminants>, PersonDeterminants> {

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

    {
        add(speedGroup);
    }

    public PersonDeterminantsField() {
        add(speedGroup);
    }

    @Override
    public void setValue(PersonDeterminants value) {
    }


    @Override
    public PersonDeterminants getValue() {
        return new PersonDeterminants();
    }

    @Override
    public Registration addValueChangeListener(ValueChangeListener<? super ValueChangeEvent<PersonDeterminants>> listener) {
        throw new UnsupportedOperationException();
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

}
