package pl.khuzzuk.wfrp.helper.ui.security

import org.assertj.core.api.AbstractAssert
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

class LoginPageView {
    @FindBy(tagName = "vaadin-text-field")
    WebElement usernameElement
    @FindBy(tagName = "vaadin-password-field")
    WebElement passwordElement
    @FindBy(tagName = "vaadin-button")
    WebElement loginElement
}
