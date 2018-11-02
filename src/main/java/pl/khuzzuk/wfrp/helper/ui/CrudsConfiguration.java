package pl.khuzzuk.wfrp.helper.ui;

import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Label;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.ui.crud.DeleteListener;
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

    @Bean
    RefreshDataListener commonRefreshDataListener() {
        return type -> bus.message(Event.FIND_ALL).withContent(type).send();
    }
}
