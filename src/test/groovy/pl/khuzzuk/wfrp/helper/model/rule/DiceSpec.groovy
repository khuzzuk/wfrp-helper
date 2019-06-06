package pl.khuzzuk.wfrp.helper.model.rule

import spock.lang.Specification
import spock.lang.Unroll

import static pl.khuzzuk.wfrp.helper.model.rule.Dice.*

class DiceSpec extends Specification {
    @Unroll
    def 'multiply dice #dice with #multiplier'() {
        when:
        def result = dice.multiplyDice(multiplier)

        then:
        result == expected

        where:
        dice | multiplier || expected
        K2   | 2          || K3
        K3   | 2          || K4
        K4   | 2          || K6
        K12  | 2          || K20
        K100 | 2          || K100
        K12  | 4          || K100
        K6   | 1          || K6
        K6   | 1.5        || K6
        K6   | 0.5        || K4
        K4   | 0.4        || K3
        K2   | 0.4        || K2
        K6   | 0.25       || K3
        K3   | 0.25       || K2
    }
}
