package pl.khuzzuk.wfrp.helper.ui;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.security.Role;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;

@Configuration
public class AdminCrudsConfiguration {
    @Bean
    Crud<Role> roleCrud(Bus<Event> bus, FormFieldFactory formFieldFactory) {
        return Crud.forBean(Role.class, bus, formFieldFactory);
    }
}
