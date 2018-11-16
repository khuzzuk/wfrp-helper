package pl.khuzzuk.wfrp.helper.ui

import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import pl.khuzzuk.wfrp.helper.util.VaadinElement

class HomePageView implements VaadinElement {
    @FindBy(tagName = "homeview")
    private WebElement homeView;

    HomePageView(WebDriver webDriver) {
        setJavascriptExecutor(webDriver)
    }

    boolean isProperlyLoaded() {
        homeView.tagName == 'homeview'
    }
}
