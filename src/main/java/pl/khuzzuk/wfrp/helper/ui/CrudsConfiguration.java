package pl.khuzzuk.wfrp.helper.ui;

import com.vaadin.flow.spring.annotation.UIScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.Race;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;

@Configuration
class CrudsConfiguration {
    @Bean
    @UIScope
    Crud<Race> raceCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        Crud<Race> raceCrud = Crud.forBean(Race.class, bus, formFieldFactory);
        raceCrud.listAllWhen(Event.RACE_ALL);
        return raceCrud;
    }
}
