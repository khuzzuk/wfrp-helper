import {DeterminantType} from "model/rule/DeterminantType";
import {Determinant} from "model/rule/Determinant";
import {ModifierType} from "model/rule/ModifierType";
import {Modifier} from "model/rule/Modifier";
import {DiceRoll} from "model/rule/DiceRoll";
import {Dice} from "model/rule/Dice";

export class DeterminantService {
    static findByType(determinants: Determinant[], type: DeterminantType): Determinant | undefined {
        return determinants.find(d => d.type === type);
    }

    static findOrAddByType(determinants: Determinant[], type: DeterminantType): Determinant {
        let determinant = determinants.find(d => d.type === type);
        if (determinant) {
            return determinant
        }

        determinant = DeterminantService.createDeterminant(type);
        determinants.push(determinant);
        return determinant;
    }

    static createDeterminant(type: DeterminantType): Determinant {
        const determinant = new Determinant();
        determinant.type = type;
        return determinant;
    }

    static removeByType(determinants: Determinant[], type: DeterminantType): Determinant[] {
        return determinants.filter(d => d.type !== type);
    }

    static addModifier(det: Determinant, modType: ModifierType): Modifier {
        const modifier = new Modifier();
        modifier.type = modType;
        det.modifiers.push(modifier);
        return modifier;
    }

    static findModifier(determinant: Determinant, mType: ModifierType): Modifier | undefined {
        return determinant.modifiers.find(m => m.type === mType);
    }

    /**
     * Creates new modifier if none exists. Should only accept cloned Determinant.
     */
    static findOrAddModifierByType(determinant: Determinant, mType: ModifierType): Modifier {
        const modifier = this.findModifier(determinant, mType);
        return !modifier ? this.addModifier(determinant, mType) : modifier;
    }

    static updateModifierValue(determinant: Determinant, mType: ModifierType, val: number): Determinant {
        const newDet = DeterminantService.clone(determinant);
        const mod = this.findOrAddModifierByType(newDet, mType);
        mod.value = val;
        return newDet;
    }

    static removeModifierByType(determinants: Determinant[], type: DeterminantType, mType: ModifierType) {
        const detIndex = determinants.map(d => d.type).indexOf(type);
        if (detIndex < 0) return;

        const determinant = determinants[detIndex];
        const indexToRemove = determinant.modifiers.map(m => m.type).indexOf(mType);
        if (indexToRemove < 0) return;

        determinant.modifiers.splice(indexToRemove, 1);
    }

    static addDiceRoll(det: Determinant, dice: Dice): Determinant {
        const newDet = DeterminantService.clone(det);
        const mod = newDet.modifiers.find(m => m.type === ModifierType.DICE) ||
            DeterminantService.addModifier(newDet, ModifierType.DICE);
        const roll = new DiceRoll();
        roll.dice = dice;
        mod.rolls.push(roll)
        return newDet;
    }

    static updateRolls(det: Determinant, dice: Dice, rolls: number) {
        const newDet = DeterminantService.clone(det);
        let mod = newDet.modifiers.find(m => m.type === ModifierType.DICE);
        if (!mod) {
            mod = new Modifier();
            mod.type = ModifierType.DICE;
            newDet.modifiers.push(mod);
        }

        let diceRolls = mod.rolls.find(d => d.dice === dice);
        if (!diceRolls) {
            diceRolls = new DiceRoll();
            diceRolls.dice = dice;
            mod.rolls.push(diceRolls);
        }
        diceRolls.rolls = rolls;

        return newDet;
    }

    static removeDiceRoll(det: Determinant, dice: Dice): Determinant {
        const newDet = DeterminantService.clone(det);
        const mod = newDet.modifiers.find(m => m.type === ModifierType.DICE) ||
            DeterminantService.addModifier(newDet, ModifierType.DICE);
        mod.rolls = mod.rolls.filter(roll => roll.dice !== dice);
        return newDet;
    }

    static getProfessionExtensions(determinants: Determinant[], type: DeterminantType): number | undefined {
        const determinant = this.findByType(determinants, type);
        if (!determinant) return;

        const modifier = this.findModifier(determinant, ModifierType.PROFESSION);
        return modifier?.value;
    }

    static getTotalValue(determinant?: Determinant) {
        if (!determinant) return 0;

        return determinant.value +
            determinant.modifiers.map(mod => mod.value).reduce((a, b) => a + b, 0);
    }

    static clone(determinant: Determinant): Determinant {
        const clone = new Determinant();
        clone.id = determinant.id;
        clone.uuid = determinant.uuid;
        clone.version = determinant.version;
        clone.value = determinant.value;
        clone.type = determinant.type;
        clone.modifiers = determinant.modifiers.map(DeterminantService.cloneModifier)

        return clone;
    }

    static cloneModifier(mod: Modifier): Modifier {
        const clone = new Modifier();
        clone.id = mod.id;
        clone.uuid = mod.uuid;
        clone.version = mod.version;
        clone.value = mod.value;
        clone.type = mod.type;
        clone.rolls = mod.rolls.map(DeterminantService.cloneDice);

        return clone;
    }

    static cloneDice(dr: DiceRoll): DiceRoll {
        const clone = new DiceRoll();
        clone.id = dr.id;
        clone.uuid = dr.uuid;
        clone.version = dr.version;
        clone.rolls = dr.rolls;
        clone.dice = dr.dice;

        return clone
    }

    static toUi(determinants: Determinant[], type: DeterminantType): string {
        const det = this.findByType(determinants, type);
        if (!det) return '';

        const diceMod = det.modifiers.find(m => m.type === ModifierType.DICE);
        if (!diceMod) return '' + this.getTotalValue(det);

        const diceRoll = diceMod.rolls.map(roll => `${roll.rolls > 1 ? roll.rolls : ''}${roll.dice}`).join(' ');
        const totalValue = this.getTotalValue(det);
        if (diceRoll.length) {
            const diceAdd = diceMod?.value;
            if (diceAdd) {
                return diceRoll + "+" + diceAdd;
            } else {
                return diceRoll;
            }
        } else {
            return totalValue.toString();
        }
    }
}