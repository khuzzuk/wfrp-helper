package pl.khuzzuk.wfrp.helper.ui.menu;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.model.Race;
import pl.khuzzuk.wfrp.helper.model.inventory.Item;
import pl.khuzzuk.wfrp.helper.model.inventory.Jewelry;
import pl.khuzzuk.wfrp.helper.model.inventory.weapons.ArmorBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.weapons.MeleeWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.weapons.RangedWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;
import pl.khuzzuk.wfrp.helper.model.skill.Skill;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

@UIScope
@Component
@Tag("RightMenu")
@RequiredArgsConstructor
public class RightMenu extends WebComponent implements InitializingBean {
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
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button jewelryButton = new Button("Jewelry");
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button blueprintsButton = new Button("Blueprints");

    @CSS(classNames = {"button", "menu-button"})
    private Button backButton = new Button("Back");

    @CSS(classNames = {"button", "menu-button"})
    private Button weaponBlueprintsButton = new Button("Melee Weapon");
    @CSS(classNames = {"button", "menu-button"})
    private Button rangedWeaponBlueprintsButton = new Button("Ranged Weapon");
    @CSS(classNames = {"button", "menu-button"})
    private Button armorBlueprintsButton = new Button("Armor");

    @CSS(classNames = {"crud", "content"})
    private final Crud<Race> raceCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<Skill> skillCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<ProfessionClass> professionClassCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<Profession> professionCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<Item> itemCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<MeleeWeaponBlueprint> meleeWeaponBlueprintCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<RangedWeaponBlueprint> rangedWeaponBlueprintCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<ArmorBlueprint> armorBlueprintCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<Jewelry> jewelryCrud;

    @Override
    public void afterPropertiesSet() {
        ComponentInitialization.initializeComponents(this);
        blueprintsButton.addClickListener(event -> this.showBlueprints());
        backButton.addClickListener(event -> {
            removeAll();
            content.removeAll();
            ComponentInitialization.initializeComponents(this);
        });

        raceButton.addClickListener(event -> showCrud(raceCrud));
        skillButton.addClickListener(event -> showCrud(skillCrud));
        professionClassButton.addClickListener(event -> showCrud(professionClassCrud));
        professionButton.addClickListener(event -> showCrud(professionCrud));
        itemButton.addClickListener(event -> showCrud(itemCrud));
        weaponBlueprintsButton.addClickListener(event -> showCrud(meleeWeaponBlueprintCrud));
        rangedWeaponBlueprintsButton.addClickListener(event -> showCrud(rangedWeaponBlueprintCrud));
        armorBlueprintsButton.addClickListener(event -> showCrud(armorBlueprintCrud));
        jewelryButton.addClickListener(event -> showCrud(jewelryCrud));
    }

    private void showCrud(Crud<?> crud) {
        content.removeAll();
        content.add(crud);
    }

    private void showBlueprints() {
        content.removeAll();
        removeAll();
        add(weaponBlueprintsButton, rangedWeaponBlueprintsButton, armorBlueprintsButton,
                backButton);
    }
}
