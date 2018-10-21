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

@Configuration
class CrudsConfiguration {
    @Bean
    @UIScope
    Crud<Race> raceCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(Race.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<Skill> skillCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(Skill.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<ProfessionClass> professionClassCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(ProfessionClass.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<Profession> professionCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(Profession.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<ArmorPattern> armorPatternCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(ArmorPattern.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<Resource> resourceCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(Resource.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<MiscItem> itemCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(MiscItem.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<MeleeWeaponBlueprint> meleeWeaponBlueprintCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(MeleeWeaponBlueprint.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<RangedWeaponBlueprint> rangedWeaponBlueprintCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(RangedWeaponBlueprint.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<ArmorBlueprint> armorBlueprintCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(ArmorBlueprint.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<Jewelry> jewelryCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(Jewelry.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<MeleeWeapon> meleeWeaponCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(MeleeWeapon.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<RangedWeapon> rangedWeaponCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(RangedWeapon.class, bus, formFieldFactory);
    }

    @Bean
    @UIScope
    Crud<Armor> armorCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(Armor.class, bus, formFieldFactory);
    }
}
