package pl.khuzzuk.wfrp.helper.ui.model.inventory.blueprints

import org.openqa.selenium.Keys
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import pl.khuzzuk.wfrp.helper.ui.util.GridElementView

class MeleeBlueprintView extends GridElementView {
    @FindBy(id = 'form-field-name')
    WebElement nameField

    @FindBy(id = 'form-field-damage')
    WebElement damageField

    @FindBy(id = 'form-field-placement')
    WebElement placementComboBox

    @FindBy(id = 'crud-form-add-button')
    WebElement addButton

    MeleeBlueprintView(WebDriver webDriver) {
        super(webDriver)
    }

    void fillValues(String name, String placement) {
        nameField.sendKeys(name)

        placementComboBox.click()
        placementComboBox.sendKeys(placement)
        placementComboBox.sendKeys(Keys.ENTER)

        damageField.click()
        waitForUi()

        addButton.click()
        waitForUi()
    }
}
