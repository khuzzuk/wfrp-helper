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
import pl.khuzzuk.wfrp.helper.model.inventory.Item;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;
import pl.khuzzuk.wfrp.helper.model.skill.Skill;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

@UIScope
@Component
@Tag("RightMenu")
@RequiredArgsConstructor
public class RightMenu extends WebComponent implements InitializingBean {
    private final Bus<Event> bus;
    private final FormFieldFactory formFieldFactory;
    private final Div content;

    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button raceButton = new Button("Race");
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button skillButton = new Button("Skills");
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button professionClassButton = new Button("Classes");
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button professionButton = new Button("Professions");
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button itemButton = new Button("Items");

    private final Crud<Race> raceCrud;
    private final Crud<Skill> skillCrud;
    private final Crud<ProfessionClass> professionClassCrud;
    private final Crud<Profession> professionCrud;
    private final Crud<Item> itemCrud;

    @Override
    public void afterPropertiesSet() {
        ComponentInitialization.initializeComponents(this);
        raceButton.addClickListener(event -> showCrud(raceCrud));
        skillButton.addClickListener(event -> showCrud(skillCrud));
        professionClassButton.addClickListener(event -> showCrud(professionClassCrud));
        professionButton.addClickListener(event -> showCrud(professionCrud));
        itemButton.addClickListener(event -> showCrud(itemCrud));
    }

    private void showCrud(Crud<?> crud) {
        content.removeAll();
        content.add(crud);
    }
}
