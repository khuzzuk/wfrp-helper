package pl.khuzzuk.wfrp.helper.util

import org.openqa.selenium.WebDriver
import org.springframework.beans.factory.annotation.Autowired

trait SeleniumSpec {
    @Autowired
    private WebDriver webDriver

    @Autowired
    void setWebDriver(WebDriver webDriver) {
        this.webDriver = webDriver
    }

    WebDriver getWebDriver() {
        return webDriver
    }

    void initSelenium() {
        webDriver.get("http://localhost:1081")
    }

    void closeSelenium() {
        webDriver.quit()
    }
}
