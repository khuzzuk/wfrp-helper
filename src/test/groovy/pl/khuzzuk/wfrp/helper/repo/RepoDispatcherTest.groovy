package pl.khuzzuk.wfrp.helper.repo

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import pl.khuzzuk.messaging.Bus
import pl.khuzzuk.wfrp.helper.Property
import pl.khuzzuk.wfrp.helper.event.Event
import spock.lang.Shared
import spock.lang.Specification

@SpringBootTest
@AutoConfigureEmbeddedDatabase
class RepoDispatcherTest extends Specification {
    @Autowired RepoDispatcher repoDispatcher
    @Autowired Bus<Event> bus

    @Shared Property<Collection> results = new Property<>()

    def setupSpec() {
        
    }

    def setup() {
        results.clear()
    }

    def 'check proper flyway configuration'() {
        expect:
        repoDispatcher != null
    }
}
