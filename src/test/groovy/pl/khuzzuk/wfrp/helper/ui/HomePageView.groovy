package pl.khuzzuk.wfrp.helper.ui

import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.CacheLookup
import org.openqa.selenium.support.FindBy
import pl.khuzzuk.wfrp.helper.util.VaadinElement

class HomePageView implements VaadinElement {
    @FindBy(tagName = "homeview")
    @CacheLookup
    private WebElement homeView

    @FindBy(id = 'logout-button')
    @CacheLookup
    private WebElement logoutButton

    @FindBy(id = 'knowledge-button')
    private WebElement knowledgeButton

    @FindBy(id = 'skill-button')
    private WebElement skillButton

    HomePageView(WebDriver webDriver) {
        setJavascriptExecutor(webDriver)
    }

    boolean isProperlyLoaded() {
        homeView.tagName == 'homeview'
    }

    void logout() {
        logoutButton.click()
        waitForUi()
    }

    void clickKnowledge() {
        knowledgeButton.click()
        waitForUi()
    }

    void clickSkill() {
        skillButton.click()
        waitForUi()
    }
}
