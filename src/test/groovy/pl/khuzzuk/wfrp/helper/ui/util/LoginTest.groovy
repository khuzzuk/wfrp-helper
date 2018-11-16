package pl.khuzzuk.wfrp.helper.ui.util

import org.openqa.selenium.WebDriver
import org.openqa.selenium.support.PageFactory
import pl.khuzzuk.wfrp.helper.ui.security.LoginPageView

trait LoginTest {
    final String ADMIN_LOGIN = "admin"
    final String ADMIN_PASSWORD = "admin"

    void login(WebDriver webDriver) {
        def loginPageView = PageFactory.initElements(webDriver, LoginPageView.class)
        loginPageView.fillUsername(ADMIN_LOGIN)
        loginPageView.fillPassword(ADMIN_PASSWORD)
        loginPageView.login()
    }
}