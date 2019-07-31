package pl.khuzzuk.wfrp.helper.service.realm

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.domain.Example
import org.springframework.test.context.ContextConfiguration
import pl.khuzzuk.wfrp.helper.WfrpHelperApplication
import pl.khuzzuk.wfrp.helper.model.creature.PersonRepo
import pl.khuzzuk.wfrp.helper.model.money.Currency
import pl.khuzzuk.wfrp.helper.model.money.CurrencyRepo
import pl.khuzzuk.wfrp.helper.model.world.Nation
import pl.khuzzuk.wfrp.helper.model.world.NationRepo
import pl.khuzzuk.wfrp.helper.model.world.Realm
import pl.khuzzuk.wfrp.helper.model.world.RealmRepo
import pl.khuzzuk.wfrp.helper.model.world.Religion
import pl.khuzzuk.wfrp.helper.model.world.ReligionRepo
import pl.khuzzuk.wfrp.helper.model.world.WorldLanguage
import pl.khuzzuk.wfrp.helper.model.world.WorldLanguageRepo
import spock.lang.Specification

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = [TestConfiguration, WfrpHelperApplication])
@AutoConfigureEmbeddedDatabase
class RealmDataRemoteServiceSpec extends Specification {
    private static final NATION = 'nation'
    private static final LANGUAGE = 'language'
    private static final RELIGION = 'religion'
    private static final CURRENCY = 'currency'

    @Autowired
    RealmRepo realmRepo

    @LocalServerPort
    int port
    @Autowired
    TestRestTemplate testRestTemplate

    def 'get realm data'() {
        given:
        Realm example = new Realm()
        example.name = 'realm'
        Realm realm = realmRepo.findAll(Example.of(example)).get(0)

        when:
        RealmData results = testRestTemplate.getForObject("http://localhost:${port}/realmData/${realm.id}", RealmData)

        then:
        with(results) {
            nations.size() == 1
            with(nations.get(0)) {
                name == NATION
            }

            languages.size() == 1
            with(languages.get(0)) {
                name == LANGUAGE
            }

            religions.size() == 1
            with(religions.get(0)) {
                name == RELIGION
            }

            currencies.size() == 1
            with(currencies.get(0)) {
                name == CURRENCY
            }
        }
    }

    @Configuration
    static class TestConfiguration {
        @Autowired
        WorldLanguageRepo worldLanguageRepo
        @Autowired
        NationRepo nationRepo
        @Autowired
        ReligionRepo religionRepo
        @Autowired
        CurrencyRepo currencyRepo
        @Autowired
        PersonRepo personRepo
        @Autowired
        RealmRepo realmRepo

        private void prepareRepo() {
            Nation nation = new Nation()
            nation.name = NATION
            nation = nationRepo.save(nation)

            WorldLanguage language = new WorldLanguage()
            language.name = LANGUAGE
            language.description = 'descr'
            language.nations = [nation]
            worldLanguageRepo.save(language)

            Religion religion = new Religion()
            religion.name = RELIGION
            religion.nations = [nation]
            religionRepo.save(religion)

            Currency currency = new Currency()
            currency.name = CURRENCY
            currency.nations = [nation]
            currency.valueMultiplier = 1f
            currencyRepo.save(currency)

            Realm realm = new Realm()
            realm.name = 'realm'
            realm.nations = [nation]
            realmRepo.save(realm)
        }

        @Bean
        CommandLineRunner startupTest() {
            return new CommandLineRunner() {
                @Override
                void run(String... args) throws Exception {
                    prepareRepo()
                }
            }
        }
    }
}
