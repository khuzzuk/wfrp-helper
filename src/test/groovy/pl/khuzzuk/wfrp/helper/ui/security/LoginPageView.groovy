package pl.khuzzuk.wfrp.helper.ui.security

import org.openqa.selenium.JavascriptExecutor
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.CacheLookup
import org.openqa.selenium.support.FindBy
import pl.khuzzuk.wfrp.helper.util.VaadinElement

class LoginPageView implements VaadinElement {
    @FindBy(tagName = "vaadin-text-field")
    @CacheLookup
    private WebElement usernameElement
    @FindBy(tagName = "vaadin-password-field")
    @CacheLookup
    private WebElement passwordElement
    @FindBy(tagName = "vaadin-button")
    @CacheLookup
    private WebElement loginElement

    LoginPageView(WebDriver driver) {
        setJavascriptExecutor(driver as JavascriptExecutor)
    }

    void fillUsername(String username) {
        usernameElement.sendKeys(username)
        waitForUi()
    }

    void fillPassword(String password) {
        passwordElement.sendKeys(password)
        waitForUi()
    }

    void login() {
        loginElement.click()
        waitForUi()
    }
}
