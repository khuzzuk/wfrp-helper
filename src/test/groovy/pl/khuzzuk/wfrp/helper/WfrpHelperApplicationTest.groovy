package pl.khuzzuk.wfrp.helper

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.openqa.selenium.support.PageFactory
import org.springframework.boot.test.context.SpringBootTest
import pl.khuzzuk.wfrp.helper.ui.HomePageView
import pl.khuzzuk.wfrp.helper.ui.security.ChangeOneTimePasswordPopupView
import pl.khuzzuk.wfrp.helper.ui.security.LoginPageView
import pl.khuzzuk.wfrp.helper.util.SeleniumConfiguration
import pl.khuzzuk.wfrp.helper.util.SeleniumSpec
import pl.khuzzuk.wfrp.helper.util.SeleniumTest
import spock.lang.Specification

@SpringBootTest(classes = [SeleniumConfiguration, WfrpHelperApplication], webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@SeleniumTest
@AutoConfigureEmbeddedDatabase
class WfrpHelperApplicationTest extends Specification implements SeleniumSpec {

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
        loginPageView.fillUsername("admin")
        loginPageView.fillPassword("admin")
        loginPageView.login()

        when:
        def changePasswordPopup = PageFactory.initElements(getWebDriver(), ChangeOneTimePasswordPopupView.class)
        changePasswordPopup.retypeOldPassword("admin")
        changePasswordPopup.retypeNewPassword("1")
        changePasswordPopup.approve()
        def homeView = PageFactory.initElements(getWebDriver(), HomePageView.class)

        then:
        homeView.isProperlyLoaded()
    }
}