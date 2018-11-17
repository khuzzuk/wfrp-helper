package pl.khuzzuk.wfrp.helper.ui.field;

import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.shared.Registration;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.model.rule.DeterminantType;

import java.util.List;

@Tag("person-determinants")
public class PersonDeterminantsField implements
        HasValue<HasValue.ValueChangeEvent<List<Determinant>>, List<Determinant>> {

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

    public void init() {
    }

    @Override
    public void setValue(List<Determinant> value) {
        value.forEach(determinant -> speed.setValue(String.valueOf(determinant.getValue())));
    }

    @Override
    public List<Determinant> getValue() {
        Determinant determinant = new Determinant();
        determinant.setType(DeterminantType.SPEED);
        determinant.setValue(Integer.valueOf(speed.getValue()));
        return List.of(determinant);
    }

    @Override
    public Registration addValueChangeListener(ValueChangeListener<? super ValueChangeEvent<List<Determinant>>> listener) {
        return null;
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
