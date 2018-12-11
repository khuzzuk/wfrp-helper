package pl.khuzzuk.wfrp.helper

import org.openqa.selenium.WebDriver
import org.openqa.selenium.support.PageFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import pl.khuzzuk.wfrp.helper.ui.model.knowledge.SkillView
import pl.khuzzuk.wfrp.helper.ui.util.LoginTest
import pl.khuzzuk.wfrp.helper.util.SeleniumTest
import spock.lang.Specification

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@SeleniumTest
class SkillSpecUI extends Specification implements LoginTest {
    @Autowired
    WebDriver webDriver

    def "check add entry for skill"() {
        given: 'load home page'
        def homeView = login(webDriver)

        when: 'navigate to skill panel'
        homeView.clickKnowledge()
        homeView.clickSkill()

        then: 'I can see my skills'
        homeView.hasVisibleCrud()
        homeView.hasElementsInCrud('Akrobatyka', 'Aktorstwo', 'Chemia', 'Warzenie trucizn')

        and:
        def skillView = PageFactory.initElements(webDriver, SkillView)
        skillView.clickAdd()

        then:
        skillView.dialogIsVisible()

        and:
        def name = "My skill"
        def descripiton = "My description"
        skillView.fillSkillCreateForm(name, descripiton)

        then:
        homeView.hasElementsInCrud('Akrobatyka', 'Aktorstwo', 'Chemia', 'Warzenie trucizn', name, descripiton)
    }
}
