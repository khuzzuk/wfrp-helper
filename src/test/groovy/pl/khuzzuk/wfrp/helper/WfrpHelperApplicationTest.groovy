package pl.khuzzuk.wfrp.helper

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.openqa.selenium.support.PageFactory
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.jdbc.Sql
import pl.khuzzuk.wfrp.helper.ui.HomePageView
import pl.khuzzuk.wfrp.helper.ui.security.ChangeOneTimePasswordPopupView
import pl.khuzzuk.wfrp.helper.ui.security.LoginPageView
import pl.khuzzuk.wfrp.helper.ui.util.LoginTest
import pl.khuzzuk.wfrp.helper.util.SeleniumConfiguration
import pl.khuzzuk.wfrp.helper.util.SeleniumSpec
import pl.khuzzuk.wfrp.helper.util.SeleniumTest
import spock.lang.Specification
import spock.lang.Stepwise

@SpringBootTest(classes = [SeleniumConfiguration, WfrpHelperApplication], webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@SeleniumTest
@AutoConfigureEmbeddedDatabase
@Stepwise
@Sql("/loginTest.sql")
class WfrpHelperApplicationTest extends Specification implements SeleniumSpec, LoginTest {

    def setupSpec() {
        println '\n\ninit\n\n\n\n'
    }

    def setup() {
        initSelenium()
    }

    def closeSpec() {
        closeSelenium()
    }

    def "check admin login"() {
        when: "load application page"
        def loginPageView = PageFactory.initElements(getWebDriver(), LoginPageView.class)

        then: "login page shows up"
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

    def "check admin logout and login"() {
        when: "load home view"
        login(webDriver)
        def homeView = PageFactory.initElements(getWebDriver(), HomePageView.class)

        then:
        homeView.isProperlyLoaded()
    }
}
