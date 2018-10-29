package pl.khuzzuk.wfrp.helper.ui;

import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.Race;
import pl.khuzzuk.wfrp.helper.model.creature.Character;
import pl.khuzzuk.wfrp.helper.model.creature.EyeColor;
import pl.khuzzuk.wfrp.helper.model.creature.HairColor;
import pl.khuzzuk.wfrp.helper.model.creature.PhysicalFeature;
import pl.khuzzuk.wfrp.helper.model.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.inventory.ArmorPattern;
import pl.khuzzuk.wfrp.helper.model.inventory.Jewelry;
import pl.khuzzuk.wfrp.helper.model.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.inventory.MiscItem;
import pl.khuzzuk.wfrp.helper.model.inventory.RangedWeapon;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.ArmorBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.MeleeWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.RangedWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.magic.Spell;
import pl.khuzzuk.wfrp.helper.model.magic.SpellSchool;
import pl.khuzzuk.wfrp.helper.model.money.Currency;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;
import pl.khuzzuk.wfrp.helper.model.resource.Resource;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.world.Language;
import pl.khuzzuk.wfrp.helper.model.world.Nation;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;
import pl.khuzzuk.wfrp.helper.ui.crud.DeleteListener;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;
import pl.khuzzuk.wfrp.helper.ui.crud.RefreshDataListener;
import pl.khuzzuk.wfrp.helper.ui.crud.SaveListener;

@AllArgsConstructor
@Configuration
class CrudsConfiguration {
    private Bus<Event> bus;
    private CrudsDataListenerList listenerList;

    @Bean
    SaveListener commonSaveListener() {
        return bean -> bus.message(Event.SAVE)
                .withContent(bean)
                .onError(() -> {
                    Dialog dialog = new Dialog();
                    dialog.add(new Label("Exception during save entity"));
                    dialog.open();
                })
                .send();
    }

    @Bean
    DeleteListener commonDeleteListener() {
        return bean -> bus.message(Event.DELETE).withContent(bean).send();
    }

    @Autowired
    void configureCrudDataListenerList() {
        bus.subscribingFor(Event.DATA_ALL).accept(listenerList::onUpdate).subscribe();
    }

    RefreshDataListener commonRefreshDataListener() {
        return type -> bus.message(Event.FIND_ALL).withContent(type).send();
    }

    @Bean
    @UIScope
    Crud<Race> raceCrud(FormFieldFactory formFieldFactory) {
        Crud<Race> crud = Crud.forBean(Race.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<Skill> skillCrud(FormFieldFactory formFieldFactory) {
        Crud<Skill> crud = Crud.forBean(Skill.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<ProfessionClass> professionClassCrud(FormFieldFactory formFieldFactory) {
        Crud<ProfessionClass> crud = Crud.forBean(ProfessionClass.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<Profession> professionCrud(FormFieldFactory formFieldFactory) {
        Crud<Profession> crud = Crud.forBean(Profession.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<ArmorPattern> armorPatternCrud(FormFieldFactory formFieldFactory) {
        Crud<ArmorPattern> crud = Crud.forBean(ArmorPattern.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<Resource> resourceCrud(FormFieldFactory formFieldFactory) {
        Crud<Resource> crud = Crud.forBean(Resource.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<MiscItem> itemCrud(FormFieldFactory formFieldFactory) {
        Crud<MiscItem> crud = Crud.forBean(MiscItem.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<MeleeWeaponBlueprint> meleeWeaponBlueprintCrud(FormFieldFactory formFieldFactory) {
        Crud<MeleeWeaponBlueprint> crud = Crud.forBean(MeleeWeaponBlueprint.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<RangedWeaponBlueprint> rangedWeaponBlueprintCrud(FormFieldFactory formFieldFactory) {
        Crud<RangedWeaponBlueprint> crud = Crud.forBean(RangedWeaponBlueprint.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<ArmorBlueprint> armorBlueprintCrud(FormFieldFactory formFieldFactory) {
        Crud<ArmorBlueprint> crud = Crud.forBean(ArmorBlueprint.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<Jewelry> jewelryCrud(FormFieldFactory formFieldFactory) {
        Crud<Jewelry> crud = Crud.forBean(Jewelry.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<MeleeWeapon> meleeWeaponCrud(FormFieldFactory formFieldFactory) {
        Crud<MeleeWeapon> crud = Crud.forBean(MeleeWeapon.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<RangedWeapon> rangedWeaponCrud(FormFieldFactory formFieldFactory) {
        Crud<RangedWeapon> crud = Crud.forBean(RangedWeapon.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<Armor> armorCrud(FormFieldFactory formFieldFactory) {
        Crud<Armor> crud = Crud.forBean(Armor.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<SpellSchool> spellSchoolCrud(FormFieldFactory formFieldFactory) {
        Crud<SpellSchool> crud = Crud.forBean(SpellSchool.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<Spell> spellCrud(FormFieldFactory formFieldFactory) {
        Crud<Spell> crud = Crud.forBean(Spell.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<Character> characterCrud(FormFieldFactory formFieldFactory) {
        Crud<Character> crud = Crud.forBean(Character.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<EyeColor> eyeColorCrud(FormFieldFactory formFieldFactory) {
        Crud<EyeColor> crud = Crud.forBean(EyeColor.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<HairColor> hairColorCrud(FormFieldFactory formFieldFactory) {
        Crud<HairColor> crud = Crud.forBean(HairColor.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<PhysicalFeature> physicalFeatureCrud(FormFieldFactory formFieldFactory) {
        Crud<PhysicalFeature> crud = Crud.forBean(PhysicalFeature.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<Nation> nationCrud(FormFieldFactory formFieldFactory) {
        Crud<Nation> crud = Crud.forBean(Nation.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<Language> languageCrud(FormFieldFactory formFieldFactory) {
        Crud<Language> crud = Crud.forBean(Language.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    @Bean
    @UIScope
    Crud<Currency> currencyCrud(FormFieldFactory formFieldFactory) {
        Crud<Currency> crud = Crud.forBean(Currency.class, formFieldFactory);
        configureCrud(crud);
        return crud;
    }

    private void configureCrud(Crud<?> crud) {
        crud.onSave(commonSaveListener());
        crud.onDelete(commonDeleteListener());
        crud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(crud);
        crud.requestData();
    }
}
