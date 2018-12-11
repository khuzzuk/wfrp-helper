package pl.khuzzuk.wfrp.helper.ui.model.knowledge

import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import pl.khuzzuk.wfrp.helper.ui.util.GridElementView

class SkillView extends GridElementView {
    @FindBy(xpath = '//vaadin-dialog-overlay//vaadin-text-field')
    List<WebElement> formFields
    @FindBy(xpath = '//vaadin-dialog-overlay//vaadin-button')
    List<WebElement> formButtons

    SkillView(WebDriver webDriver) {
        super(webDriver)
    }

    void fillSkillCreateForm(String name, String description) {
        formFields.get(0).sendKeys(name)
        formFields.get(1).sendKeys(description)
        formButtons.get(0).click()
        waitForUi()
    }
}
