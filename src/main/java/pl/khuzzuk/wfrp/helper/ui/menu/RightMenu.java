package pl.khuzzuk.wfrp.helper.ui.menu;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.Race;
import pl.khuzzuk.wfrp.helper.model.creature.Character;
import pl.khuzzuk.wfrp.helper.model.creature.EyeColor;
import pl.khuzzuk.wfrp.helper.model.creature.HairColor;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.model.creature.PhysicalFeature;
import pl.khuzzuk.wfrp.helper.model.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.inventory.ArmorPattern;
import pl.khuzzuk.wfrp.helper.model.inventory.Item;
import pl.khuzzuk.wfrp.helper.model.inventory.Jewelry;
import pl.khuzzuk.wfrp.helper.model.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.inventory.RangedWeapon;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.ArmorBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.MeleeWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.RangedWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.magic.Spell;
import pl.khuzzuk.wfrp.helper.model.magic.SpellSchool;
import pl.khuzzuk.wfrp.helper.model.money.Currency;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;
import pl.khuzzuk.wfrp.helper.model.resource.Resource;
import pl.khuzzuk.wfrp.helper.model.world.Language;
import pl.khuzzuk.wfrp.helper.model.world.Nation;
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.character.GMCharacterView;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.CrudField;
import pl.khuzzuk.wfrp.helper.ui.initialize.HasCrud;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.util.ArrayList;
import java.util.Collection;

@HasCrud
@UIScope
@Component
@Lazy
@Tag("RightMenu")
@RequiredArgsConstructor
public class RightMenu extends WebComponent implements InitializingBean {
    private final Bus<Event> bus;
    private final Div content;

    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button personButton = new Button("Persons");
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button raceButton = new Button("Race");
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button inventoryButton = new Button("Inventory");
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button blueprintsButton = new Button("Blueprints");
    @UIProperty
    @CSS(classNames = {"button", "menu-button"}, id = "knowledge-button")
    private Button knowledgeButton = new Button("Knowledge");
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button lookButton = new Button("Look");

    @CSS(classNames = {"button", "menu-button"})
    private Button worldButton = new Button("World");

    @CSS(classNames = {"button", "menu-button"})
    private Button backButton = new Button("Back");
    @CSS(classNames = {"button", "menu-button"})
    private Button backToKnowledgeButton = new Button("Back");

    @CSS(classNames = {"button", "menu-button"}, id = "skill-button")
    private Button skillButton = new Button("Skills");
    @CSS(classNames = {"button", "menu-button"})
    private Button professionClassButton = new Button("Classes");
    @CSS(classNames = {"button", "menu-button"})
    private Button professionButton = new Button("Professions");
    @CSS(classNames = {"button", "menu-button"})
    private Button spellSchoolButton = new Button("Magic school");
    @CSS(classNames = {"button", "menu-button"})
    private Button spellButton = new Button("Spells");

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

    @CSS(classNames = {"button", "menu-button"})
    private Button characterButton = new Button("Character");
    @CSS(classNames = {"button", "menu-button"})
    private Button eyeColorButton = new Button("Eye Color");
    @CSS(classNames = {"button", "menu-button"})
    private Button hairColorButton = new Button("Hair color");
    @CSS(classNames = {"button", "menu-button"})
    private Button physicalFeaturesButton = new Button("Features");

    @CSS(classNames = {"button", "menu-button"})
    private Button nationButton = new Button("Nations");
    @CSS(classNames = {"button", "menu-button"})
    private Button languageButton = new Button("Languages");
    @CSS(classNames = {"button", "menu-button"})
    private Button currencyButton = new Button("Currencies");

    @CSS(classNames = {"button"})
    private Button addPerson = new Button(VaadinIcon.PLUS.create());
    @CSS(classNames = {"button"})
    private Button editPerson = new Button(VaadinIcon.EDIT.create());
    private HorizontalLayout personTableButtons = new HorizontalLayout(addPerson, editPerson);
    private Grid<Person> persons = new Grid<>(Person.class);
    private ListDataProvider<Person> personDataProvider = DataProvider.ofCollection(new ArrayList<>());
    private final GMCharacterView characterView;

    @CrudField
    private Crud<Race> raceCrud;
    @CrudField
    private Crud<Skill> skillCrud;
    @CrudField
    private Crud<ProfessionClass> professionClassCrud;
    @CrudField
    private Crud<Profession> professionCrud;
    @CrudField
    private Crud<SpellSchool> spellSchoolCrud;
    @CrudField
    private Crud<Spell> spellCrud;
    @CrudField
    private Crud<Resource> resourceCrud;
    @CrudField
    private Crud<ArmorPattern> armorPatternCrud;
    @CrudField
    private Crud<Item> itemCrud;
    @CrudField
    private Crud<MeleeWeaponBlueprint> meleeWeaponBlueprintCrud;
    @CrudField
    private Crud<RangedWeaponBlueprint> rangedWeaponBlueprintCrud;
    @CrudField
    private Crud<ArmorBlueprint> armorBlueprintCrud;
    @CrudField
    private Crud<Jewelry> jewelryCrud;
    @CrudField
    private Crud<MeleeWeapon> meleeWeaponCrud;
    @CrudField
    private Crud<RangedWeapon> rangedWeaponCrud;
    @CrudField
    private Crud<Armor> armorCrud;
    @CrudField
    private Crud<Character> characterCrud;
    @CrudField
    private Crud<EyeColor> eyeColorCrud;
    @CrudField
    private Crud<HairColor> hairColorCrud;
    @CrudField
    private Crud<PhysicalFeature> physicalFeatureCrud;
    @CrudField
    private Crud<Nation> nationCrud;
    @CrudField
    private Crud<Language> languageCrud;
    @CrudField
    private Crud<Currency> currencyCrud;

    @Override
    public void afterPropertiesSet() {
        inventoryButton.addClickListener(event -> showInventory());
        blueprintsButton.addClickListener(event -> showBlueprints());
        knowledgeButton.addClickListener(event -> showKnowledge());
        lookButton.addClickListener(event -> showLook());
        worldButton.addClickListener(event -> showWorld());
        backButton.addClickListener(event -> {
            removeAll();
            content.removeAll();
            ComponentInitialization.initializeComponents(this);
        });
        backToKnowledgeButton.addClickListener(event -> showKnowledge());

        raceButton.addClickListener(event -> showCrud(raceCrud));
        skillButton.addClickListener(event -> showCrud(skillCrud));
        professionClassButton.addClickListener(event -> showCrud(professionClassCrud));
        professionButton.addClickListener(event -> showCrud(professionCrud));
        spellSchoolButton.addClickListener(event -> showCrud(spellSchoolCrud));
        spellButton.addClickListener(event -> showCrud(spellCrud));
        nationButton.addClickListener(event -> showCrud(nationCrud));
        languageButton.addClickListener(event -> showCrud(languageCrud));
        currencyButton.addClickListener(event -> showCrud(currencyCrud));
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
        characterButton.addClickListener(event -> showCrud(characterCrud));
        eyeColorButton.addClickListener(event -> showCrud(eyeColorCrud));
        hairColorButton.addClickListener(event -> showCrud(hairColorCrud));
        physicalFeaturesButton.addClickListener(event -> showCrud(physicalFeatureCrud));

        preparePersonsView();
    }

    private void showCrud(Crud<?> crud) {
        content.removeAll();
        content.add(crud);
    }

    private void preparePersonsView() {
        bus.subscribingFor(Event.DATA_ALL).accept((QueryAllResult data) -> {
            if (data.getType().equals(Person.class)) {
                personDataProvider.getItems().clear();
                personDataProvider.getItems().addAll((Collection<Person>) data.getItems());
                execute(() -> personDataProvider.refreshAll());
                execute(() -> getUI().get().push());
            }
        }).subscribe();
        personButton.addClickListener(event -> showPersons());
        persons.getColumns().forEach(persons::removeColumn);
        persons.addColumn("name");
        persons.addColumn("gender");
        persons.setDataProvider(personDataProvider);
        addPerson.addClickListener(e -> showCharacter(new Person()));
        editPerson.addClickListener(e -> showCharacter(persons.getSelectedItems().iterator().next()));
        editPerson.setEnabled(false);
        persons.addSelectionListener(event -> editPerson.setEnabled(event.getFirstSelectedItem().isPresent()));
    }

    public void showPersons() {
        content.removeAll();
        content.add(personTableButtons, persons);
        bus.message(Event.FIND_ALL).withContent(Person.class).send();
    }

    private void showCharacter(Person person) {
        characterView.load(person);
        content.removeAll();
        content.add(characterView);
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

    private void showKnowledge() {
        content.removeAll();
        removeAll();
        add(skillButton, professionClassButton, professionButton, spellSchoolButton, spellButton, worldButton, backButton);
    }

    private void showWorld() {
        content.removeAll();
        removeAll();
        add(nationButton, languageButton, currencyButton, backToKnowledgeButton);
    }

    private void showLook() {
        content.removeAll();
        removeAll();
        add(characterButton, eyeColorButton, hairColorButton, physicalFeaturesButton, backButton);
    }
}
