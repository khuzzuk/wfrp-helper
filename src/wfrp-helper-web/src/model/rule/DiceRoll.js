import Entity from "../Entity";

export const Dice = {
    K2: 'K2',
    K3: 'K3',
    K4: 'K4',
    K6: 'K6',
    K8: 'K8',
    K10: 'K10',
    K12: 'K12',
    K20: 'K20',
    K100: 'K100',

    allOf() {
        return [
            this.K2,
            this.K3,
            this.K4,
            this.K6,
            this.K8,
            this.K10,
            this.K12,
            this.K20,
            this.K100,
        ]
    }
};

export default class DiceRoll extends Entity {
    dice: string;
    rolls: number;

    toString() {
        return this.rolls + this.dice
    }
}
