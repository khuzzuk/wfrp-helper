package pl.khuzzuk.wfrp.helper.event;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.khuzzuk.messaging.Bus;

@Configuration
class EventConfiguration {
    @Bean
    Bus<Event> bus() {
        return Bus.initializeBus(Event.class);
    }
}
