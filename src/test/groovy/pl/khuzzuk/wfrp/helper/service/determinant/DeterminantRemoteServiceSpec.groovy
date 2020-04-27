package pl.khuzzuk.wfrp.helper.service.determinant

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import pl.khuzzuk.wfrp.helper.model.creature.CreatureDeterminantsDTO
import pl.khuzzuk.wfrp.helper.model.rule.*
import pl.khuzzuk.wfrp.helper.model.world.RaceDTO
import spock.lang.Specification
import spock.lang.Unroll

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureEmbeddedDatabase
class DeterminantRemoteServiceSpec extends Specification {
    @Autowired
    TestRestTemplate restTemplate
    @LocalServerPort
    int port

    @Unroll
    def "test add extension to #determinantType with from profession #professionValue"() {
        given:
        DeterminantDTO determinantDTO = new DeterminantDTO()
        determinantDTO.setType(determinantType)

        ModifierDTO modifier = new ModifierDTO()
        modifier.type = ModifierType.PROFESSION
        modifier.value = professionValue
        determinantDTO.setModifiers([modifier] as List<ModifierDTO>)

        HttpHeaders headers = new HttpHeaders()
        headers.setContentType(MediaType.APPLICATION_JSON)

        when:
        ResponseEntity<DeterminantDTO> result = restTemplate.postForEntity(
                "/determinant/addExperienceExtension",
                new HttpEntity<Object>(determinantDTO, headers),
                DeterminantDTO.class)

        and: 'Invoke second time to get another extension if possible only'
        result = restTemplate.postForEntity(
                "/determinant/addExperienceExtension",
                new HttpEntity(result.getBody(), headers),
                DeterminantDTO.class)

        then:
        with(result.getBody()) {
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
        determinantType        | professionValue | extensions || expectedValue
        DeterminantType.ATTACK | 1               | 1          || 1
        DeterminantType.BATTLE | 10              | 1          || 10
        DeterminantType.BATTLE | 20              | 2          || 10
        DeterminantType.BATTLE | 0               | 0          || 0
    }

    def 'test remove extension'() {
        given:
        ModifierDTO modifier = new ModifierDTO()
        modifier.type = ModifierType.EXPERIENCE
        modifier.value = 10

        DeterminantDTO determinant = new DeterminantDTO()
        determinant.modifiers = [modifier] as List

        when:
        DeterminantDTO result = restTemplate.postForEntity(
                "http://localhost:${port}/determinant/removeExperienceExtension",
                determinant,
                DeterminantDTO.class).getBody()

        then:
        with(result) {
            modifiers == List.of()
        }
    }

    def 'resolve race rolls'() {
        given:
        DiceRollDTO roll = new DiceRollDTO()
        roll.dice = Dice.K10
        roll.rolls = 2

        ModifierDTO mod = new ModifierDTO()
        mod.type = ModifierType.DICE
        mod.rolls = [roll] as List

        DeterminantDTO determinant = new DeterminantDTO()
        determinant.type = DeterminantType.BATTLE
        determinant.modifiers = [mod] as List

        RaceDTO raceDTO = new RaceDTO()
        raceDTO.determinants = [determinant] as List

        HttpHeaders headers = new HttpHeaders()
        headers.setContentType(MediaType.APPLICATION_JSON)
        headers.setAccept([MediaType.APPLICATION_JSON])

        when:
        CreatureDeterminantsDTO resolved = restTemplate.getForObject(
                "/determinant/generateDeterminants/1",
                CreatureDeterminantsDTO.class)

        then:
        resolved.determinants.size() == 13
        def battle = resolved.determinants.stream().filter({ it.type == DeterminantType.BATTLE }).findAny().get()
        def strength = resolved.determinants.stream().filter({ it.type == DeterminantType.STRENGTH }).findAny().get()

        with(battle) {
            value <= 40
            value >= 22
            with(modifiers) {
                size() == 0
            }
        }

        with(strength) {
            value <= 4
            value >= 2
            with(modifiers) {
                size() == 0
            }
        }
    }

    @Configuration
    @ComponentScan(['pl.khuzzuk.wfrp.helper.model', 'pl.khuzzuk.wfrp.helper'])
    class TestConfig {}
}
