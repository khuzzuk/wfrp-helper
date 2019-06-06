package pl.khuzzuk.wfrp.helper.service.crafting

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeaponRepo
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints.MeleeWeaponBlueprint
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints.MeleeWeaponBlueprintRepo
import pl.khuzzuk.wfrp.helper.model.crafting.resource.Resource
import pl.khuzzuk.wfrp.helper.model.crafting.resource.ResourceRepo
import pl.khuzzuk.wfrp.helper.model.money.Price
import pl.khuzzuk.wfrp.helper.model.rule.Dice
import pl.khuzzuk.wfrp.helper.model.rule.DiceRoll
import pl.khuzzuk.wfrp.helper.model.rule.Modifier
import pl.khuzzuk.wfrp.helper.model.rule.ModifierType
import pl.khuzzuk.wfrp.helper.model.rule.Placement
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

import java.util.stream.Collectors

import static pl.khuzzuk.wfrp.helper.model.rule.Dice.K4
import static pl.khuzzuk.wfrp.helper.model.rule.Dice.K6

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureEmbeddedDatabase
class WeaponRemoteServiceSpec extends Specification {
    @Autowired
    MeleeWeaponRepo meleeWeaponRepo
    @Autowired
    MeleeWeaponBlueprintRepo meleeWeaponBlueprintRepo
    @Autowired
    ResourceRepo resourceRepo
    @Shared
    static TestRestTemplate testRestTemplate = new TestRestTemplate()
    @LocalServerPort
    int port

    @Unroll
    def 'test get damage for melee weapon with dices #dices and strength #strength'() {
        given:
        MeleeWeaponBlueprint meleeWeaponBlueprint = new MeleeWeaponBlueprint()
        meleeWeaponBlueprint.name = UUID.randomUUID().toString()
        meleeWeaponBlueprint.damage = createDamage(dices, times, damage)
        meleeWeaponBlueprint.suggestedPrice = new Price()
        meleeWeaponBlueprint.placement = Placement.HAND

        meleeWeaponBlueprintRepo.save(meleeWeaponBlueprint)

        MeleeWeapon meleeWeapon = new MeleeWeapon()
        meleeWeapon.type = meleeWeaponBlueprint
        meleeWeapon.name = UUID.randomUUID().toString()
        meleeWeapon.determinants = []
        meleeWeapon.price = new Price()
        meleeWeapon.primaryResource = resourceRepo.save(createResource(strength))
        meleeWeapon.secondaryResource = resourceRepo.save(createResource(secondaryStrength))

        def weaponId = meleeWeaponRepo.save(meleeWeapon).id

        when:
        def results = testRestTemplate.getForObject("http://localhost:${port}/weapon/getMeleeWeaponDamage/${weaponId}", String)

        then:
        results == expected

        where:
        strength | secondaryStrength | dices            | times | damage || expected
        1        | 0                 | [K6] as List     | 1     | 4      || 'K6 + 4'
        1        | 0                 | [K6] as List     | 2     | 4      || '2K6 + 4'
        0.5F     | 0                 | [K6] as List     | 1     | 4      || 'K4 + 2'
        2        | 1                 | [K6] as List     | 1     | 4      || 'K8 + 12'
        1        | 0                 | [K6, K4] as List | 1     | 4      || 'K6 + K4 + 4'
    }

    private static Modifier createDamage(List<Dice> dices, int times, int damage) {
        Modifier modifier = new Modifier()
        modifier.type = ModifierType.DICE
        modifier.value = damage
        modifier.rolls = dices.stream().map({createDiceRoll(it, times)}).collect(Collectors.toList())
        modifier
    }

    private static DiceRoll createDiceRoll(Dice dice, int rolls) {
        DiceRoll diceRoll = new DiceRoll()
        diceRoll.rolls = rolls
        diceRoll.dice = dice
        diceRoll
    }

    private static Resource createResource(float strength) {
        Resource resource = new Resource()
        resource.name = UUID.randomUUID().toString()
        resource.strength = strength
        resource
    }
}
