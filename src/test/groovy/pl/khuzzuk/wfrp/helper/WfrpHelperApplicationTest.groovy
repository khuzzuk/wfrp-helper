package pl.khuzzuk.wfrp.helper

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.openqa.selenium.support.PageFactory
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.TestPropertySource
import pl.khuzzuk.wfrp.helper.ui.HomePageView
import pl.khuzzuk.wfrp.helper.ui.security.ChangeOneTimePasswordPopupView
import pl.khuzzuk.wfrp.helper.ui.security.LoginPageView
import pl.khuzzuk.wfrp.helper.ui.util.LoginTest
import pl.khuzzuk.wfrp.helper.util.SeleniumConfiguration
import pl.khuzzuk.wfrp.helper.util.SeleniumSpec
import pl.khuzzuk.wfrp.helper.util.SeleniumTest
import spock.lang.Specification

@SpringBootTest(classes = [SeleniumConfiguration, WfrpHelperApplication], webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@SeleniumTest
@AutoConfigureEmbeddedDatabase
@TestPropertySource(properties = 'spring.flyway.locations=classpath:/db/migration,/db/data,db/test')
class WfrpHelperApplicationTest extends Specification implements SeleniumSpec, LoginTest {

    def setup() {
        initSelenium()
    }

    def closeSpec() {
        closeSelenium()
    }

    def "check admin login"() {
        when: 'load application page'
        def loginPageView = PageFactory.initElements(getWebDriver(), LoginPageView.class)

        then: 'login page shows up'
        loginPageView.fillUsername(ADMIN_LOGIN)
        loginPageView.fillPassword(ADMIN_LOGIN)
        loginPageView.login()

        when:
        def changePasswordPopup = PageFactory.initElements(getWebDriver(), ChangeOneTimePasswordPopupView.class)
        changePasswordPopup.retypeOldPassword(ADMIN_LOGIN)
        changePasswordPopup.retypeNewPassword(ADMIN_PASSWORD)
        changePasswordPopup.approve()
        def homeView = PageFactory.initElements(getWebDriver(), HomePageView.class)

        then:
        homeView.isProperlyLoaded()
    }

    def "check user logout and login"() {
        when: 'load home view'
        def homeView = login(webDriver)

        then: 'I can see app page'
        homeView.isProperlyLoaded()

        and: 'when I log out'
        homeView.logout()
        def newHomeView = login(webDriver)

        then:
        newHomeView.isProperlyLoaded()
    }

    def "check add entry for skill"() {
        given: 'load home page'
        def homeView = login(webDriver)

        when: 'navigate to skill panel'
        homeView.clickKnowledge()
        homeView.clickSkill()

        then:
        homeView.isProperlyLoaded()
    }
}
