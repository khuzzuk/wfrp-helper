package pl.khuzzuk.wfrp.helper.util

import org.springframework.beans.factory.annotation.Autowired
import pl.khuzzuk.messaging.Bus
import pl.khuzzuk.messaging.BusSubscriber
import pl.khuzzuk.wfrp.helper.Property
import pl.khuzzuk.wfrp.helper.event.Event

import java.util.concurrent.TimeUnit

import static org.awaitility.Awaitility.await

trait BusSpec {
    static boolean initialized
    static Bus<Event> bus
    static List<Pair<Event, Property<?>>> listeners = new ArrayList<>()

    @Autowired
    void setBus(Bus<Event> bus) {
        if (!initialized) {
            initialized = true
            this.bus = bus
            listeners.forEach({ pair ->
                bus.subscribingFor(pair.key).accept({ pair.value.value = it }).subscribe()
            })
        }
    }

    void closeBus() {
        bus.closeBus()
    }

    void busGetter(Event event, Property<?> property) {
        listeners.add(new Pair<Event, Property<?>>(event, property))
    }

    void checkProperty(Property<?> propertyContainer, int timeout) {
        await().atMost(timeout, TimeUnit.SECONDS).until({propertyContainer.hasValue()})
    }

    BusSubscriber<Event> subscribingFor(Event event) {
        bus.subscribingFor(event)
    }

    private static class Pair<L, R> {
        private L key
        private R value

    }
}