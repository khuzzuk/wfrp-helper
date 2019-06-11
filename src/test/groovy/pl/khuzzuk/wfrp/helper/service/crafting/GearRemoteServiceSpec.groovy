package pl.khuzzuk.wfrp.helper.service.crafting

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Armor
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.ArmorPattern
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.ArmorPatternRepo
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.ArmorRepo
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Availability
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeaponRepo
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints.ArmorBlueprint
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.blueprints.ArmorBlueprintRepo
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
class GearRemoteServiceSpec extends Specification {
    @Autowired
    MeleeWeaponRepo meleeWeaponRepo
    @Autowired
    MeleeWeaponBlueprintRepo meleeWeaponBlueprintRepo
    @Autowired
    ArmorRepo armorRepo
    @Autowired
    ArmorBlueprintRepo armorBlueprintRepo
    @Autowired
    ArmorPatternRepo armorPatternRepo
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
        def results = testRestTemplate.getForObject("http://localhost:${port}/gear/getMeleeWeaponDamage/${weaponId}", String)

        then:
        results == expected

        where:
        strength | secondaryStrength | dices            | times | damage || expected
        1        | 0                 | [K6] as List     | 1     | 4      || 'K6 + 4'
        1        | 0                 | [K6] as List     | 2     | 4      || '2K6 + 4'
        0.5F     | 0                 | [K6] as List     | 1     | 4      || 'K4 + 2'
        2        | 10                | [K6] as List     | 1     | 4      || 'K8 + 12'
        1        | 0                 | [K6, K4] as List | 1     | 4      || 'K6 + K4 + 4'
    }

    @Unroll
    def 'test get armorValue for armor #blueprintArmor, pattern #patternStrength and resource #resourceStrength'() {
        given:
        Armor armor = createArmor(blueprintArmor, patternStrength, resourceStrength)

        when:
        def results = testRestTemplate.getForObject("http://localhost:${port}/gear/getArmorValue/${armor.id}", String)

        then:
        results == expectedValue

        where:
        blueprintArmor | patternStrength | resourceStrength || expectedValue
        1              | 1               | 1                || '1'
        1              | 3               | 2                || '6'
        2              | 2               | 3                || '12'
    }

    def 'test gear values'() {
        given:
        Armor armor1 = createArmor(1, 1, 1, 1,
                [Placement.HAND, Placement.TORSO])
        Armor armor2 = createArmor(1, 1, 1, 1,
                [Placement.HEAD, Placement.TORSO])

        HttpHeaders headers = new HttpHeaders()
        headers.setContentType(MediaType.APPLICATION_JSON)
        def requestBody = new HttpEntity<Object>([armor1.id, armor2.id] as Long[], headers)

        when:
        def results = testRestTemplate.postForEntity("http://localhost:${port}/gear/getArmorValuesForGear", requestBody, Map)

        println results

        then:
        with(results) {
            body.get("TORSO") == 2
            body.get("HAND") == 1
            body.get("HEAD") == 1
        }
        results != null
    }

    private Armor createArmor(int blueprintArmor = 0,
                              int patternStrength = 0,
                              int resourceStrength = 0,
                              int secondaryResourceStrength = 0,
                              List<Placement> placement = [Placement.HEAD]) {

        ArmorBlueprint armorBlueprint = new ArmorBlueprint()
        armorBlueprint.name = UUID.randomUUID().toString()
        armorBlueprint.armor = blueprintArmor
        armorBlueprint.placement = placement
        armorBlueprint.suggestedPrice = new Price()
        armorBlueprint.suggestedWeight = 1
        armorBlueprint = armorBlueprintRepo.save(armorBlueprint)

        ArmorPattern armorPattern = new ArmorPattern()
        armorPattern.name = UUID.randomUUID().toString()
        armorPattern.strength = patternStrength
        armorPattern.priceMultiplier = 1
        armorPattern.weight = 1
        armorPattern.availability = Availability.ABUNDANT
        armorPattern = armorPatternRepo.save(armorPattern)

        Armor armor = new Armor()
        armor.name = UUID.randomUUID().toString()
        armor.price = new Price()
        armor.type = armorBlueprint
        armor.primaryResource = resourceRepo.save(createResource(resourceStrength))
        armor.secondaryResource = resourceRepo.save(createResource(secondaryResourceStrength))
        armor.armorPattern = armorPattern
        armorRepo.save(armor)
    }

    private static Modifier createDamage(List<Dice> dices, int times, int damage) {
        Modifier modifier = new Modifier()
        modifier.type = ModifierType.DICE
        modifier.value = damage
        modifier.rolls = dices.stream().map({ createDiceRoll(it, times) }).collect(Collectors.toList())
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
