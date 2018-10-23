package pl.khuzzuk.wfrp.helper.ui;

import com.vaadin.flow.spring.annotation.UIScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.Race;
import pl.khuzzuk.wfrp.helper.model.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.inventory.ArmorPattern;
import pl.khuzzuk.wfrp.helper.model.inventory.Jewelry;
import pl.khuzzuk.wfrp.helper.model.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.inventory.MiscItem;
import pl.khuzzuk.wfrp.helper.model.inventory.RangedWeapon;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.ArmorBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.MeleeWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.blueprints.RangedWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;
import pl.khuzzuk.wfrp.helper.model.resource.Resource;
import pl.khuzzuk.wfrp.helper.model.skill.Skill;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;
import pl.khuzzuk.wfrp.helper.ui.crud.SaveListener;

@Configuration
class CrudsConfiguration {
    @Bean
    SaveListener commonSaveListener(Bus<Event> bus) {
        return bean -> bus.message(Event.SAVE).withContent(bean).send();
    }

    @Bean
    @UIScope
    Crud<Race> raceCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<Race> raceCrud = Crud.forBean(Race.class, formFieldFactory);
        raceCrud.onSave(commonSaveListener);
        return raceCrud;
    }

    @Bean
    @UIScope
    Crud<Skill> skillCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<Skill> skillCrud = Crud.forBean(Skill.class, formFieldFactory);
        skillCrud.onSave(commonSaveListener);
        return skillCrud;
    }

    @Bean
    @UIScope
    Crud<ProfessionClass> professionClassCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<ProfessionClass> professionClassCrud = Crud.forBean(ProfessionClass.class, formFieldFactory);
        professionClassCrud.onSave(commonSaveListener);
        return professionClassCrud;
    }

    @Bean
    @UIScope
    Crud<Profession> professionCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<Profession> professionCrud = Crud.forBean(Profession.class, formFieldFactory);
        professionCrud.onSave(commonSaveListener);
        return professionCrud;
    }

    @Bean
    @UIScope
    Crud<ArmorPattern> armorPatternCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<ArmorPattern> armorPatternCrud = Crud.forBean(ArmorPattern.class, formFieldFactory);
        armorPatternCrud.onSave(commonSaveListener);
        return armorPatternCrud;
    }

    @Bean
    @UIScope
    Crud<Resource> resourceCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<Resource> resourceCrud = Crud.forBean(Resource.class, formFieldFactory);
        resourceCrud.onSave(commonSaveListener);
        return resourceCrud;
    }

    @Bean
    @UIScope
    Crud<MiscItem> itemCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<MiscItem> miscItemCrud = Crud.forBean(MiscItem.class, formFieldFactory);
        miscItemCrud.onSave(commonSaveListener);
        return miscItemCrud;
    }

    @Bean
    @UIScope
    Crud<MeleeWeaponBlueprint> meleeWeaponBlueprintCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<MeleeWeaponBlueprint> meleeWeaponBlueprintCrud = Crud.forBean(MeleeWeaponBlueprint.class, formFieldFactory);
        meleeWeaponBlueprintCrud.onSave(commonSaveListener);
        return meleeWeaponBlueprintCrud;
    }

    @Bean
    @UIScope
    Crud<RangedWeaponBlueprint> rangedWeaponBlueprintCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<RangedWeaponBlueprint> rangedWeaponBlueprintCrud = Crud.forBean(RangedWeaponBlueprint.class, formFieldFactory);
        rangedWeaponBlueprintCrud.onSave(commonSaveListener);
        return rangedWeaponBlueprintCrud;
    }

    @Bean
    @UIScope
    Crud<ArmorBlueprint> armorBlueprintCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<ArmorBlueprint> armorBlueprintCrud = Crud.forBean(ArmorBlueprint.class, formFieldFactory);
        armorBlueprintCrud.onSave(commonSaveListener);
        return armorBlueprintCrud;
    }

    @Bean
    @UIScope
    Crud<Jewelry> jewelryCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<Jewelry> jewelryCrud = Crud.forBean(Jewelry.class, formFieldFactory);
        jewelryCrud.onSave(commonSaveListener);
        return jewelryCrud;
    }

    @Bean
    @UIScope
    Crud<MeleeWeapon> meleeWeaponCrud(FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<MeleeWeapon> meleeWeaponCrud = Crud.forBean(MeleeWeapon.class, formFieldFactory);
        meleeWeaponCrud.onSave(commonSaveListener);
        return meleeWeaponCrud;
    }

    @Bean
    @UIScope
    Crud<RangedWeapon> rangedWeaponCrud(Bus<Event> bus, FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<RangedWeapon> rangedWeaponCrud = Crud.forBean(RangedWeapon.class, formFieldFactory);
        rangedWeaponCrud.onSave(commonSaveListener);
        return rangedWeaponCrud;
    }

    @Bean
    @UIScope
    Crud<Armor> armorCrud(Bus<Event> bus, FormFieldFactory formFieldFactory, SaveListener commonSaveListener) {
        Crud<Armor> armorCrud = Crud.forBean(Armor.class, formFieldFactory);
        armorCrud.onSave(commonSaveListener);
        return armorCrud;
    }
}
