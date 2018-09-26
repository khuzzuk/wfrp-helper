package pl.khuzzuk.wfrp.helper.repo;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.Race;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Component
class RepoDispatcher implements InitializingBean {
    private final Bus<Event> bus;
    private final RaceRepo raceRepo;

    @Override
    public void afterPropertiesSet() {
        bus.subscribingFor(Event.FIND_ALL).accept((Class<?> type) -> findAll(type)).subscribe();
        bus.subscribingFor(Event.SAVE).accept(this::save).subscribe();
        bus.subscribingFor(Event.DELETE).accept(this::remove).subscribe();
    }

    @SuppressWarnings("unchecked")
    private <T> void findAll(Class<T> type) {
        List all = Collections.emptyList();

        if (Race.class.equals(type)) {
            all = raceRepo.findAll();
        }

        bus.message(Event.DATA_ALL).withContent(new QueryAllResult<>(type, (Collection<T>) all)).send();
    }

    private void save(Object entity) {
        if (entity instanceof Race) {
            raceRepo.save((Race) entity);
            findAll(entity.getClass());
        } else {
            bus.message(Event.ERROR).withContent(String.format("Cannot save entity of type %s", entity.getClass())).send();
        }
    }

    private void remove(Object entity) {
        if (entity instanceof Race) {
            raceRepo.delete((Race) entity);
            findAll(Race.class);
        }
    }
}
