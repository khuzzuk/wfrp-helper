package pl.khuzzuk.wfrp.helper


import org.openqa.selenium.WebDriver
import org.openqa.selenium.support.PageFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import pl.khuzzuk.wfrp.helper.ui.model.inventory.blueprints.MeleeBlueprintView
import pl.khuzzuk.wfrp.helper.ui.util.LoginTest
import pl.khuzzuk.wfrp.helper.util.SeleniumTest
import spock.lang.Ignore
import spock.lang.Specification

import java.util.concurrent.TimeUnit

import static org.awaitility.Awaitility.await

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@SeleniumTest
@Ignore
class MeleeWeaponSpecUI extends Specification implements LoginTest {
    @Autowired
    WebDriver webDriver

    private static final String NAME = 'name'
    private static final String GOLD = '1'
    private static final String SILVER = '2'
    private static final String LEAD = '3'
    private static final String WEIGHT = '1.1'
    private static final String DAMAGE = '1K6+0'
    private static final String PLACEMENT = 'HAND'

    def "check adding melee weapon type"() {
        given: 'load home page'
        def homeView = login(webDriver)

        when: 'navigate to Melee blueprints panel'
        homeView.clickTypes()
        homeView.clickMeleeType()

        then: 'crud is visible'
        homeView.hasVisibleCrud()

        and: 'try add melee type (blueprint) entry'
        def blueprintView = PageFactory.initElements(webDriver, MeleeBlueprintView)
        blueprintView.clickAdd()

        then: 'create form is visible'
        blueprintView.dialogIsVisible()

        and: 'try to fill the form'
        blueprintView.fillValues(NAME, PLACEMENT)

        then:
        await().atMost(2, TimeUnit.SECONDS).until({homeView.hasElementsInCrud(NAME)})
    }
}
