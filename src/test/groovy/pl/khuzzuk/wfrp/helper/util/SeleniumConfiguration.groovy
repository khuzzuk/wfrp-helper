package pl.khuzzuk.wfrp.helper.util

import io.github.bonigarcia.wdm.WebDriverManager
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SeleniumConfiguration {
    @Bean
    WebDriver webDriver() {
        WebDriverManager.chromedriver().setup()
        new ChromeDriver()
    }
}
