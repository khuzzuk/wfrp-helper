package pl.khuzzuk.wfrp.helper.ui.util


import org.openqa.selenium.JavascriptExecutor
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import pl.khuzzuk.wfrp.helper.util.VaadinElement

class GridElementView implements VaadinElement {
    protected WebDriver webDriver

    @FindBy(className = 'filters-group')
    private WebElement filtersGroup

    @FindBy(tagName = 'vaadin-dialog-overlay')
    protected WebElement dialog

    @FindBy(xpath = '//content//vaadin-button')
    protected List<WebElement> gridButtons

    GridElementView(WebDriver webDriver) {
        setJavascriptExecutor(webDriver as JavascriptExecutor)
        this.webDriver = webDriver
    }

    void clickAdd() {
        gridButtons.get(0).click()
        waitForUi()
    }

    boolean dialogIsVisible() {
        dialog.tagName == 'vaadin-dialog-overlay'
    }
}
