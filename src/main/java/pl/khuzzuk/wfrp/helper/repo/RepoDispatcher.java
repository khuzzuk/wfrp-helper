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
    }

    private List<?> findAll(Class<?> type) {
        if (Race.class.equals(type)) {
            return raceRepo.findAll();
        }
        return Collections.emptyList();
    }
}
