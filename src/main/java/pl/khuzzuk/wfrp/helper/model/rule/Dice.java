package pl.khuzzuk.wfrp.helper.model.rule;

public enum Dice {
    K2, K3, K4, K6, K8, K10, K12, K20, K100;

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
}
