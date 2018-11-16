package pl.khuzzuk.wfrp.helper.ui.security

import org.openqa.selenium.JavascriptExecutor
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import pl.khuzzuk.wfrp.helper.util.VaadinElement

class ChangeOneTimePasswordPopupView implements VaadinElement {
    @FindBy(xpath = "//vaadin-dialog-overlay//vaadin-password-field")
    private List<WebElement> passwordFields
    @FindBy(xpath = "//vaadin-dialog-overlay//vaadin-button")
    private WebElement approveButton

    ChangeOneTimePasswordPopupView(WebDriver webDriver) {
        setJavascriptExecutor(webDriver as JavascriptExecutor)
    }

    void retypeOldPassword(String oldPassword) {
        passwordFields.get(0).sendKeys(oldPassword)
        waitForUi()
    }

    void retypeNewPassword(String newPassword) {
        passwordFields.get(1).sendKeys(newPassword)
        waitForUi()
        passwordFields.get(2).sendKeys(newPassword)
        waitForUi()
    }

    void approve() {
        approveButton.click()
        waitForUi()
    }
}
