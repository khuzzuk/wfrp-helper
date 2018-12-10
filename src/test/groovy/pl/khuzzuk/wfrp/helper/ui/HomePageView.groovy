package pl.khuzzuk.wfrp.helper.ui


import org.openqa.selenium.JavascriptExecutor
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.CacheLookup
import org.openqa.selenium.support.FindBy
import pl.khuzzuk.wfrp.helper.ui.util.GridElementView
import pl.khuzzuk.wfrp.helper.util.VaadinElement

class HomePageView implements VaadinElement {
    private WebDriver driver

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

    @FindBy(className = 'crud-grid')
    private WebElement currentGrid
    @FindBy(css = 'vaadin-grid /deep/ tbody')
    private WebElement internalGrid
    private GridElementView gridElementView

    HomePageView(WebDriver webDriver) {
        setJavascriptExecutor(webDriver as JavascriptExecutor)
        this.driver = webDriver
    }

    boolean isProperlyLoaded() {
        homeView.tagName == 'homeview'
    }

    boolean hasElementsInCrud() {
        internalGrid.tagName == 'tbody' &&
        currentGrid.tagName == 'vaadin-grid'
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
