package pl.khuzzuk.wfrp.helper.ui;

import com.vaadin.flow.spring.annotation.UIScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.security.Role;
import pl.khuzzuk.wfrp.helper.security.User;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;
import pl.khuzzuk.wfrp.helper.ui.crud.FormFieldFactory;

@Configuration
public class AdminCrudsConfiguration {
    @Bean
    @UIScope
    Crud<Role> roleCrud(Bus<Event> bus, FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<Role> roleCrud = Crud.forBean(Role.class, formFieldFactory);
        roleCrud.onSave(role -> bus.message(Event.SAVE).withContent(role).send());
        roleCrud.onDelete(role -> bus.message(Event.DELETE).withContent(role).send());
        roleCrud.onRefreshRequest(type -> bus.message(Event.FIND_ALL).withContent(type).send());
        listenerList.addCrud(roleCrud);

        roleCrud.requestData();
        return roleCrud;
    }

    @Bean
    @UIScope
    Crud<User> userCrud(Bus<Event> bus, FormFieldFactory formFieldFactory, CrudsDataListenerList listenerList) {
        Crud<User> userCrud = Crud.forBean(User.class, formFieldFactory);
        userCrud.onSave(user -> bus.message(Event.SECURITY_SAVE_USER).withContent(user).send());
        userCrud.onDelete(user -> bus.message(Event.SECURITY_DELETE_USER).withContent(user).send());
        userCrud.onRefreshRequest(type -> {
            System.out.println(type);
            bus.message(Event.FIND_ALL).withContent(type).send();
        });
        listenerList.addCrud(userCrud);

        userCrud.requestData();
        return userCrud;
    }
}
