package pl.khuzzuk.wfrp.helper.service.determinant

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.test.context.ContextConfiguration
import pl.khuzzuk.wfrp.helper.model.rule.*
import spock.lang.Specification
import spock.lang.Unroll

@ContextConfiguration(classes = [DeterminantRemoteService, DeterminantService, ModifierService, TestConfig])
class DeterminantRemoteServiceSpec extends Specification {
    @Autowired
    DeterminantRemoteService determinantRemoteService

    @Unroll
    def "test add extension to #determinantType with from profession #professionValue"() {
        given:
        DeterminantDTO determinantDTO = new DeterminantDTO()
        determinantDTO.setType(determinantType)

        ModifierDTO modifier = new ModifierDTO()
        modifier.type = ModifierType.PROFESSION
        modifier.value = professionValue
        determinantDTO.setModifiers([modifier] as List<ModifierDTO>)

        when:
        def result = determinantRemoteService.addExperienceExtension(determinantDTO)

        and:
        result = determinantRemoteService.addExperienceExtension(result)

        then:
        with(result) {
            modifiers.size() == extensions + 1
            value == 0
            with(modifiers.get(0)) {
                value == professionValue
                type == ModifierType.PROFESSION
            }
            if (extensions > 0) {
                with(modifiers.get(1)) {
                    value == expectedValue
                    type == ModifierType.EXPERIENCE
                }
            }
            if (extensions > 1) {
                with(modifiers.get(2)) {
                    value == expectedValue
                    type == ModifierType.EXPERIENCE
                }
            }
        }

        where:
        determinantType             | professionValue | extensions || expectedValue
        DeterminantType.ATTACK      | 1               | 1          || 1
        DeterminantType.BATTLE      | 10              | 1          || 10
        DeterminantType.BATTLE      | 20              | 2          || 10
        DeterminantType.BATTLE      | 0               | 0          || 0
    }

    def 'test remove extension'() {
        given:
        DeterminantDTO determinant = new DeterminantDTO()

        ModifierDTO modifier = new ModifierDTO()
        modifier.type = ModifierType.EXPERIENCE
        modifier.value = 10

        when:
        def result = determinantRemoteService.removeExperienceExtension(determinant)

        then:
        with(result) {
            modifiers == List.of()
        }
    }

    @Configuration
    @ComponentScan('pl.khuzzuk.wfrp.helper.model')
    class TestConfig {}
}
