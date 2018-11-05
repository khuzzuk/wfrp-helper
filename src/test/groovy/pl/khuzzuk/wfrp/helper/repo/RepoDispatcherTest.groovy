package pl.khuzzuk.wfrp.helper.repo

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import pl.khuzzuk.wfrp.helper.Property
import pl.khuzzuk.wfrp.helper.event.Event
import pl.khuzzuk.wfrp.helper.util.BusTest
import spock.lang.Shared
import spock.lang.Specification

@SpringBootTest
@AutoConfigureEmbeddedDatabase
class RepoDispatcherTest extends Specification implements BusTest {
    @Autowired RepoDispatcher repoDispatcher

    @Shared Property<Collection> results = new Property<>()

    def setupSpec() {
        busGetter(Event.DATA_ALL, results)
    }

    def setup() {
        results.clear()
    }

    def 'check proper flyway configuration'() {
        expect:
        repoDispatcher != null
        results.value == null
    }
}
