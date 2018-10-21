package pl.khuzzuk.wfrp.helper.ui.menu;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.model.Race;
import pl.khuzzuk.wfrp.helper.model.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.inventory.ArmorPattern;
import pl.khuzzuk.wfrp.helper.model.inventory.Item;
import pl.khuzzuk.wfrp.helper.model.inventory.Jewelry;
import pl.khuzzuk.wfrp.helper.model.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.inventory.RangedWeapon;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.ArmorBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.MeleeWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.RangedWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;
import pl.khuzzuk.wfrp.helper.model.resource.Resource;
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
    private Button inventoryButton = new Button("Inventory");
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button blueprintsButton = new Button("Blueprints");

    @CSS(classNames = {"button", "menu-button"})
    private Button backButton = new Button("Back");


    @CSS(classNames = {"button", "menu-button"})
    private Button armorPatternButton = new Button("Patterns");
    @CSS(classNames = {"button", "menu-button"})
    private Button resourceButton = new Button("Resources");
    @CSS(classNames = {"button", "menu-button"})
    private Button itemButton = new Button("Items");
    @CSS(classNames = {"button", "menu-button"})
    private Button jewelryButton = new Button("Jewelry");
    @CSS(classNames = {"button", "menu-button"})
    private Button meleeWeaponButton = new Button("Weapons");
    @CSS(classNames = {"button", "menu-button"})
    private Button rangedWeaponButton = new Button("Guns");
    @CSS(classNames = {"button", "menu-button"})
    private Button armorButton = new Button("Armors");

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
    private final Crud<Resource> resourceCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<ArmorPattern> armorPatternCrud;
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
    @CSS(classNames = {"crud", "content"})
    private final Crud<MeleeWeapon> meleeWeaponCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<RangedWeapon> rangedWeaponCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<Armor> armorCrud;

    @Override
    public void afterPropertiesSet() {
        ComponentInitialization.initializeComponents(this);
        inventoryButton.addClickListener(event -> this.showInventory());
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
        resourceButton.addClickListener(event -> showCrud(resourceCrud));
        armorPatternButton.addClickListener(event -> showCrud(armorPatternCrud));
        itemButton.addClickListener(event -> showCrud(itemCrud));
        weaponBlueprintsButton.addClickListener(event -> showCrud(meleeWeaponBlueprintCrud));
        rangedWeaponBlueprintsButton.addClickListener(event -> showCrud(rangedWeaponBlueprintCrud));
        armorBlueprintsButton.addClickListener(event -> showCrud(armorBlueprintCrud));
        jewelryButton.addClickListener(event -> showCrud(jewelryCrud));
        meleeWeaponButton.addClickListener(event -> showCrud(meleeWeaponCrud));
        rangedWeaponButton.addClickListener(event -> showCrud(rangedWeaponCrud));
        armorButton.addClickListener(event -> showCrud(armorCrud));
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

    private void showInventory() {
        content.removeAll();
        removeAll();
        add(resourceButton, armorPatternButton, itemButton, meleeWeaponButton, rangedWeaponButton, armorButton, jewelryButton, backButton);
    }
}
