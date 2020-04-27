package pl.khuzzuk.wfrp.helper.model.rule;

import java.util.PrimitiveIterator.OfInt;
import java.util.Random;

public enum Dice {
    K2(2), K3(3), K4(4), K6(6), K8(8), K10(10), K12(12), K20(20), K100(100);

    private final OfInt roll;
    Dice(int size) {
        roll = new Random().ints(1, size + 1).iterator();
    }

    public Dice multiplyDice(float multiplier) {
        if (multiplier >= 2) {
            if (Dice.values().length - 1 <= this.ordinal()) {
                return this;
            }
            return Dice.values()[this.ordinal() + 1].multiplyDice(multiplier / 2);
        } else if (multiplier <= 0.5) {
            if (this.ordinal() == 0) {
                return this;
            }
            return Dice.values()[this.ordinal() - 1].multiplyDice(multiplier * 2);
        }

        return this;
    }

    public int roll() {
        return roll.nextInt();
    }
}
