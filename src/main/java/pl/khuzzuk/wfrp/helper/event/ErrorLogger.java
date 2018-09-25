package pl.khuzzuk.wfrp.helper.event;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;

@RequiredArgsConstructor
@Component
class ErrorLogger implements InitializingBean {
    private final Bus<Event> bus;


    @Override
    public void afterPropertiesSet() throws Exception {
        bus.subscribingFor(Event.ERROR).accept(System.err::println).subscribe();
    }
}
