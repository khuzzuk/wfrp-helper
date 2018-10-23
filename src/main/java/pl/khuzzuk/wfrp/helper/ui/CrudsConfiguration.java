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
import pl.khuzzuk.wfrp.helper.ui.crud.DeleteListener;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;
import pl.khuzzuk.wfrp.helper.ui.crud.RefreshDataListener;
import pl.khuzzuk.wfrp.helper.ui.crud.SaveListener;

@AllArgsConstructor
@Configuration
class CrudsConfiguration {
    private Bus<Event> bus;

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
    void configureCrudDataListenerList(CrudsDataListenerList listenerList) {
        bus.subscribingFor(Event.DATA_ALL).accept(listenerList::onUpdate).subscribe();
    }

    RefreshDataListener commonRefreshDataListener() {
        return type -> bus.message(Event.FIND_ALL).withContent(type).send();
    }

    @Bean
    @UIScope
    Crud<Race> raceCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<Race> raceCrud = Crud.forBean(Race.class, formFieldFactory);
        raceCrud.onSave(commonSaveListener());
        raceCrud.onDelete(commonDeleteListener());
        raceCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(raceCrud);
        return raceCrud;
    }

    @Bean
    @UIScope
    Crud<Skill> skillCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<Skill> skillCrud = Crud.forBean(Skill.class, formFieldFactory);
        skillCrud.onSave(commonSaveListener());
        skillCrud.onDelete(commonDeleteListener());
        skillCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(skillCrud);
        return skillCrud;
    }

    @Bean
    @UIScope
    Crud<ProfessionClass> professionClassCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<ProfessionClass> professionClassCrud = Crud.forBean(ProfessionClass.class, formFieldFactory);
        professionClassCrud.onSave(commonSaveListener());
        professionClassCrud.onDelete(commonDeleteListener());
        professionClassCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(professionClassCrud);
        return professionClassCrud;
    }

    @Bean
    @UIScope
    Crud<Profession> professionCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<Profession> professionCrud = Crud.forBean(Profession.class, formFieldFactory);
        professionCrud.onSave(commonSaveListener());
        professionCrud.onDelete(commonDeleteListener());
        professionCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(professionCrud);
        return professionCrud;
    }

    @Bean
    @UIScope
    Crud<ArmorPattern> armorPatternCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<ArmorPattern> armorPatternCrud = Crud.forBean(ArmorPattern.class, formFieldFactory);
        armorPatternCrud.onSave(commonSaveListener());
        armorPatternCrud.onDelete(commonDeleteListener());
        armorPatternCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(armorPatternCrud);
        return armorPatternCrud;
    }

    @Bean
    @UIScope
    Crud<Resource> resourceCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<Resource> resourceCrud = Crud.forBean(Resource.class, formFieldFactory);
        resourceCrud.onSave(commonSaveListener());
        resourceCrud.onDelete(commonDeleteListener());
        resourceCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(resourceCrud);
        return resourceCrud;
    }

    @Bean
    @UIScope
    Crud<MiscItem> itemCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<MiscItem> miscItemCrud = Crud.forBean(MiscItem.class, formFieldFactory);
        miscItemCrud.onSave(commonSaveListener());
        miscItemCrud.onDelete(commonDeleteListener());
        miscItemCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(miscItemCrud);
        return miscItemCrud;
    }

    @Bean
    @UIScope
    Crud<MeleeWeaponBlueprint> meleeWeaponBlueprintCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<MeleeWeaponBlueprint> meleeWeaponBlueprintCrud = Crud.forBean(MeleeWeaponBlueprint.class, formFieldFactory);
        meleeWeaponBlueprintCrud.onSave(commonSaveListener());
        meleeWeaponBlueprintCrud.onDelete(commonDeleteListener());
        meleeWeaponBlueprintCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(meleeWeaponBlueprintCrud);
        return meleeWeaponBlueprintCrud;
    }

    @Bean
    @UIScope
    Crud<RangedWeaponBlueprint> rangedWeaponBlueprintCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<RangedWeaponBlueprint> rangedWeaponBlueprintCrud = Crud.forBean(RangedWeaponBlueprint.class, formFieldFactory);
        rangedWeaponBlueprintCrud.onSave(commonSaveListener());
        rangedWeaponBlueprintCrud.onDelete(commonDeleteListener());
        rangedWeaponBlueprintCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(rangedWeaponBlueprintCrud);
        return rangedWeaponBlueprintCrud;
    }

    @Bean
    @UIScope
    Crud<ArmorBlueprint> armorBlueprintCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<ArmorBlueprint> armorBlueprintCrud = Crud.forBean(ArmorBlueprint.class, formFieldFactory);
        armorBlueprintCrud.onSave(commonSaveListener());
        armorBlueprintCrud.onDelete(commonDeleteListener());
        armorBlueprintCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(armorBlueprintCrud);
        return armorBlueprintCrud;
    }

    @Bean
    @UIScope
    Crud<Jewelry> jewelryCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<Jewelry> jewelryCrud = Crud.forBean(Jewelry.class, formFieldFactory);
        jewelryCrud.onSave(commonSaveListener());
        jewelryCrud.onDelete(commonDeleteListener());
        jewelryCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(jewelryCrud);
        return jewelryCrud;
    }

    @Bean
    @UIScope
    Crud<MeleeWeapon> meleeWeaponCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<MeleeWeapon> meleeWeaponCrud = Crud.forBean(MeleeWeapon.class, formFieldFactory);
        meleeWeaponCrud.onSave(commonSaveListener());
        meleeWeaponCrud.onDelete(commonDeleteListener());
        meleeWeaponCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(meleeWeaponCrud);
        return meleeWeaponCrud;
    }

    @Bean
    @UIScope
    Crud<RangedWeapon> rangedWeaponCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<RangedWeapon> rangedWeaponCrud = Crud.forBean(RangedWeapon.class, formFieldFactory);
        rangedWeaponCrud.onSave(commonSaveListener());
        rangedWeaponCrud.onDelete(commonDeleteListener());
        rangedWeaponCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(rangedWeaponCrud);
        return rangedWeaponCrud;
    }

    @Bean
    @UIScope
    Crud<Armor> armorCrud(FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<Armor> armorCrud = Crud.forBean(Armor.class, formFieldFactory);
        armorCrud.onSave(commonSaveListener());
        armorCrud.onDelete(commonDeleteListener());
        armorCrud.onRefreshRequest(commonRefreshDataListener());
        listenerList.addCrud(armorCrud);
        return armorCrud;
    }
}
