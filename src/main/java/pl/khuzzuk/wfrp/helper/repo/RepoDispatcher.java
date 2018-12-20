package pl.khuzzuk.wfrp.helper.repo;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

@RequiredArgsConstructor
@Repository
class RepoDispatcher implements InitializingBean {
    private final Bus<Event> bus;

    private Map<Class<?>, JpaRepository<?, Long>> repositories = new HashMap<>();

    <T> void registerDispatching(Class<T> entity, JpaRepository<T, Long> repository) {
        repositories.put(entity, repository);
    }

    @Override
    public void afterPropertiesSet() {
        bus.subscribingFor(Event.FIND_ALL).accept((Consumer<Class<?>>) this::findAll).subscribe();
        bus.subscribingFor(Event.SAVE).accept(this::save).subscribe();
        bus.subscribingFor(Event.DELETE).accept(this::remove).subscribe();
    }

    @SuppressWarnings("unchecked")
    private <T> void findAll(Class<T> type) {
        JpaRepository<T, Long> repository = (JpaRepository<T, Long>) repositories.get(type);
        if (repository == null) {
            throw new IllegalStateException(String.format("No repository defined for type %s", type));
        }

        List<T> all = repository.findAll();
        bus.message(Event.DATA_ALL).withContent(new QueryAllResult<>(type, all)).send();
    }

    @SuppressWarnings("unchecked")
    private <T> void save(T entity) {
        JpaRepository<T, Long> repository = (JpaRepository<T, Long>) repositories.get(entity.getClass());
        repository.save(entity);
        findAll(entity.getClass());
    }

    @SuppressWarnings("unchecked")
    private <T> void remove(T entity) {
        JpaRepository<T, Long> repository = (JpaRepository<T, Long>) repositories.get(entity.getClass());
        repository.delete(entity);
        findAll(entity.getClass());
    }
}
