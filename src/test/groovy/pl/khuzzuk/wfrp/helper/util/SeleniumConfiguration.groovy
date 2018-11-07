package pl.khuzzuk.wfrp.helper.util

import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SeleniumConfiguration {
    @Bean
    WebDriver webDriver() {
        System.setProperty("webdriver.chrome.driver", "/home/adrabik/java/chromedriver")
        new ChromeDriver()
    }
}
