package pl.khuzzuk.wfrp.helper.util

import org.openqa.selenium.WebDriver
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.annotation.AnnotationUtils
import org.springframework.test.context.TestContext
import org.springframework.test.context.support.AbstractTestExecutionListener

class SeleniumTestExecutionListener extends AbstractTestExecutionListener {
    @Autowired
    private WebDriver webDriver

    @Override
    void beforeTestClass(TestContext testContext) throws Exception {
        SeleniumTest annotation = AnnotationUtils.findAnnotation(testContext.testClass, SeleniumTest)
        webDriver.get(annotation.baseUrl())
    }

    @Override
    void afterTestClass(TestContext testContext) throws Exception {
        webDriver.quit()
    }
}
