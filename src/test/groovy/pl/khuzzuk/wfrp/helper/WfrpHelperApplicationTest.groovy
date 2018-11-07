package pl.khuzzuk.wfrp.helper

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.openqa.selenium.support.PageFactory
import org.springframework.boot.test.context.SpringBootTest
import pl.khuzzuk.wfrp.helper.ui.security.LoginPageView
import pl.khuzzuk.wfrp.helper.util.SeleniumConfiguration
import pl.khuzzuk.wfrp.helper.util.SeleniumSpec
import pl.khuzzuk.wfrp.helper.util.SeleniumTest
import spock.lang.Specification

@SpringBootTest(classes = [SeleniumConfiguration, WfrpHelperApplication])
@SeleniumTest
@AutoConfigureEmbeddedDatabase
class WfrpHelperApplicationTest extends Specification implements SeleniumSpec {

    def setup() {
        initSelenium()
    }

    def closeSpec() {
        closeSelenium()
    }

    def "check admin login"() {
        expect:
        PageFactory.initElements(getWebDriver(), LoginPageView.class) != null
        println "got it"
    }
}
