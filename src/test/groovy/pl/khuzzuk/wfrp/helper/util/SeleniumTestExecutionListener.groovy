package pl.khuzzuk.wfrp.helper.util

import io.github.bonigarcia.wdm.WebDriverManager
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import org.springframework.beans.factory.config.BeanDefinitionCustomizer
import org.springframework.context.support.GenericApplicationContext
import org.springframework.core.Ordered
import org.springframework.core.annotation.AnnotationUtils
import org.springframework.test.context.TestContext
import org.springframework.test.context.support.AbstractTestExecutionListener

import static org.springframework.beans.factory.config.ConfigurableBeanFactory.SCOPE_PROTOTYPE

class SeleniumTestExecutionListener extends AbstractTestExecutionListener implements Ordered {
    ChromeDriver webDriver
    SeleniumTest annotation

    @Override
    void beforeTestClass(TestContext testContext) throws Exception {
        annotation = AnnotationUtils.findAnnotation(testContext.testClass, SeleniumTest)
        WebDriverManager.chromedriver().setup()
        GenericApplicationContext applicationContext = testContext.getApplicationContext() as GenericApplicationContext
        applicationContext.registerBean(WebDriver, {reopenBrowser()}, {it.scope = SCOPE_PROTOTYPE} as BeanDefinitionCustomizer)
    }

    WebDriver reopenBrowser() {
        ChromeOptions options = new ChromeOptions()
        options.addArguments('headless')
        webDriver = new ChromeDriver()
        webDriver
    }

    @Override
    void beforeTestMethod(TestContext testContext) throws Exception {
        webDriver.get(annotation.baseUrl())
    }

    @Override
    void afterTestMethod(TestContext testContext) throws Exception {
        webDriver.quit()
    }

    @Override
    void afterTestClass(TestContext testContext) throws Exception {
        //webDriver.quit()
    }

    @Override
    int getOrder() {
        return 1999
    }
}
