package pl.khuzzuk.wfrp.helper.repo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.creature.Person;

import javax.annotation.PostConstruct;

@RequiredArgsConstructor
@Service
public class RemoteEntityUpdater {
    private final Bus<Event> bus;
    private final Updater<Person> entityUpdater;

    @PostConstruct
    private void init() {
        bus.subscribingFor(Event.UPDATE).accept(this::update).subscribe();
    }

    private void update(Person person) {
        entityUpdater.update(person);
    }
}
