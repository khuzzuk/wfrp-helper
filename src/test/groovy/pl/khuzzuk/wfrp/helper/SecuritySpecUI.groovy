package pl.khuzzuk.wfrp.helper

import org.openqa.selenium.WebDriver
import org.openqa.selenium.support.PageFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import pl.khuzzuk.wfrp.helper.ui.HomePageView
import pl.khuzzuk.wfrp.helper.ui.security.ChangeOneTimePasswordPopupView
import pl.khuzzuk.wfrp.helper.ui.security.LoginPageView
import pl.khuzzuk.wfrp.helper.ui.util.LoginTest
import pl.khuzzuk.wfrp.helper.util.SeleniumTest
import spock.lang.Ignore
import spock.lang.Specification

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@SeleniumTest
@Ignore
class SecuritySpecUI extends Specification implements LoginTest {
    @Autowired
    WebDriver webDriver

    def "check admin login"() {
        when: 'load application page'
        def loginPageView = PageFactory.initElements(webDriver, LoginPageView.class)

        then: 'login page shows up'
        loginPageView.fillUsername(ADMIN_LOGIN)
        loginPageView.fillPassword(ADMIN_LOGIN)
        loginPageView.login()

        when:
        def changePasswordPopup = PageFactory.initElements(webDriver, ChangeOneTimePasswordPopupView.class)
        changePasswordPopup.retypeOldPassword(ADMIN_LOGIN)
        changePasswordPopup.retypeNewPassword(ADMIN_PASSWORD)
        changePasswordPopup.approve()
        def homeView = PageFactory.initElements(webDriver, HomePageView.class)

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

}
