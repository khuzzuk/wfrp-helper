package pl.khuzzuk.wfrp.helper.repo

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import pl.khuzzuk.wfrp.helper.Property
import pl.khuzzuk.wfrp.helper.event.Event
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass
import pl.khuzzuk.wfrp.helper.util.BusTest
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Stepwise

@SpringBootTest
@AutoConfigureEmbeddedDatabase
@Stepwise
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

    def 'check save skills'() {
        given: "two skills to save"
        Skill skill1 = new Skill()
        skill1.name = 'skill1'
        skill1.description = "skill1 description"
        Skill skill2 = new Skill()
        skill2.name = 'skill2'
        skill2.description = "skill2 description"

        when: "save skill 1"
        bus.message(Event.SAVE).withContent(skill1).send()
        checkProperty(results, 2)

        then: "received one skill"
        results.value.items.contains(skill1)

        and: "save skill 2"
        results.setValue(null)
        bus.message(Event.SAVE).withContent(skill2).send()
        checkProperty(results, 2)

        then: "received two skills"
        results.value.items.containsAll(skill1, skill2)
    }

    def 'check save profession class'() {
        given: "two skills to save"
        ProfessionClass professionClass1 = new ProfessionClass()
        professionClass1.name = 'professionClass1'
        professionClass1.description = "professionClass1 description"
        ProfessionClass professionClass2 = new ProfessionClass()
        professionClass2.name = 'professionClass2'
        professionClass2.description = "professionClass2 description"

        when: "save skill 1"
        bus.message(Event.SAVE).withContent(professionClass1).send()
        checkProperty(results, 2)

        then: "received one skill"
        results.value.items.contains(professionClass1)

        and: "save skill 2"
        results.setValue(null)
        bus.message(Event.SAVE).withContent(professionClass2).send()
        checkProperty(results, 2)

        then: "received two skills"
        results.value.items.containsAll(professionClass1, professionClass2)
    }
}
