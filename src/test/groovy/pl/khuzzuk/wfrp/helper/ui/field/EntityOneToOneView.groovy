package pl.khuzzuk.wfrp.helper.ui.field

import org.openqa.selenium.By
import org.openqa.selenium.JavascriptExecutor
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory
import pl.khuzzuk.wfrp.helper.util.VaadinElement

class EntityOneToOneView implements VaadinElement {
    @FindBy(id = 'crud-form-add-button')
    WebElement addButton

    static EntityOneToOneView showForm(WebDriver webDriver, WebElement triggerElement) {
        triggerElement.findElement(By.tagName('vaadin-button')).click()
        def form = PageFactory.initElements(webDriver, EntityOneToOneView)
        form.setJavascriptExecutor(webDriver as JavascriptExecutor)
        return form
    }

    void apply() {
        addButton.click()
        waitForUi()
    }
}
