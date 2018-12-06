package pl.khuzzuk.wfrp.helper.ui.util

import org.openqa.selenium.WebDriver
import org.openqa.selenium.support.PageFactory
import org.springframework.test.context.jdbc.Sql
import pl.khuzzuk.wfrp.helper.ui.HomePageView
import pl.khuzzuk.wfrp.helper.ui.security.LoginPageView

trait LoginTest {
    final String ADMIN_LOGIN = 'admin'
    final String ADMIN_PASSWORD = 'admin'
    final String USER_LOGIN = 'user'
    final String USER_PASSWORD = 'password'

    HomePageView login(WebDriver webDriver) {
        def loginPageView = PageFactory.initElements(webDriver, LoginPageView.class)
        loginPageView.fillUsername(USER_LOGIN)
        loginPageView.fillPassword(USER_PASSWORD)
        loginPageView.login()
        PageFactory.initElements(getWebDriver(), HomePageView.class)
    }
}