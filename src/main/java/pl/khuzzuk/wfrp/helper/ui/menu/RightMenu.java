package pl.khuzzuk.wfrp.helper.ui.menu;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.Race;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

@UIScope
@Component
@Tag("RightMenu")
@RequiredArgsConstructor
public class RightMenu extends WebComponent implements InitializingBean {
    private final Bus<Event> bus;
    private final FormFieldFactory formFieldFactory;

    @UIProperty
    private Button raceButton = new Button("Race");

    @UIProperty
    private Div content = new Div();

    private Crud<Race> raceCrud;

    @Override
    public void afterPropertiesSet() {
        raceCrud = Crud.forBean(Race.class, bus, formFieldFactory);
        ComponentInitialization.initializeComponents(this);
        raceButton.addClickListener(event -> showRace());
    }

    private void showRace() {
        content.removeAll();
        content.add(raceCrud);
    }
}
