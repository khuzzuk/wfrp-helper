package pl.khuzzuk.wfrp.helper.ui

import org.openqa.selenium.By
import org.openqa.selenium.JavascriptExecutor
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.CacheLookup
import org.openqa.selenium.support.FindBy
import pl.khuzzuk.wfrp.helper.ui.util.GridElementView
import pl.khuzzuk.wfrp.helper.util.VaadinElement

import java.util.stream.Collectors

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
    @FindBy(tagName = 'vaadin-grid-cell-content')
    private List<WebElement> gridContent
    private GridElementView gridElementView

    HomePageView(WebDriver webDriver) {
        setJavascriptExecutor(webDriver as JavascriptExecutor)
        this.driver = webDriver
    }

    boolean isProperlyLoaded() {
        homeView.tagName == 'homeview'
    }

    boolean hasVisibleCrud() {
        def shadowRoot = searchShadowRoot(currentGrid)
        def element = shadowRoot.findElement(By.cssSelector('tbody'))
        element.tagName == 'tbody' &&
                currentGrid.tagName == 'vaadin-grid'
    }

    boolean hasElementsInCrud(String... elements) {
        gridContent.stream()
                .map({ it.text })
                .collect(Collectors.toList()).containsAll(elements)
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
