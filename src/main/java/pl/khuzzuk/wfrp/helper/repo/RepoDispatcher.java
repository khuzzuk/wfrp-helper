package pl.khuzzuk.wfrp.helper.repo;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.Race;

import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Component
class RepoDispatcher implements InitializingBean {
    private final Bus<Event> bus;
    private final RaceRepo raceRepo;

    @Override
    public void afterPropertiesSet() {
        bus.subscribingFor(Event.FIND_ALL).mapResponse(this::findAll).subscribe();
        bus.subscribingFor(Event.SAVE).accept(this::save).subscribe();
    }

    private List<?> findAll(Class<?> type) {
        if (Race.class.equals(type)) {
            return raceRepo.findAll();
        }
        return Collections.emptyList();
    }

    private void save(Object entity) {
        if (entity instanceof Race) {
            raceRepo.save((Race) entity);
        } else {
            bus.message(Event.ERROR).withContent(String.format("Cannot save entity of type %s", entity.getClass())).send();
        }
    }
}
