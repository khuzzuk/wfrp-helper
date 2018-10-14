package pl.khuzzuk.wfrp.helper.ui;

import com.vaadin.flow.spring.annotation.UIScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.Race;
import pl.khuzzuk.wfrp.helper.model.inventory.MiscItem;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;
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
    Crud<MiscItem> itemCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(MiscItem.class, bus, formFieldFactory);
    }
}
