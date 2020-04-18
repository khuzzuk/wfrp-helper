import Profession                     from "../professions/Profession";
import Determinant, {DeterminantType} from "../rule/Determinant";

export default class CreatureDeterminants {
    determinants: Determinant[] = [];

    constructor() {
        const speed = new Determinant();
        speed.type = DeterminantType.SPEED;
        const battle = new Determinant();
        battle.type = DeterminantType.BATTLE;
        const shooting = new Determinant();
        shooting.type = DeterminantType.SHOOTING;
        const strength = new Determinant();
        strength.type = DeterminantType.STRENGTH;
        const durability = new Determinant();
        durability.type = DeterminantType.DURABILITY;
        const health = new Determinant();
        health.type = DeterminantType.HEALTH;
        const attack = new Determinant();
        attack.type = DeterminantType.ATTACK;
        const initiative = new Determinant();
        initiative.type = DeterminantType.INITIATIVE;
        const dexterity = new Determinant();
        dexterity.type = DeterminantType.DEXTERITY;
        const leaderSkills = new Determinant();
        leaderSkills.type = DeterminantType.LEADER_SKILLS;
        const intelligence = new Determinant();
        intelligence.type = DeterminantType.INTELLIGENCE;
        const control = new Determinant();
        control.type = DeterminantType.CONTROL;
        const will = new Determinant();
        will.type = DeterminantType.WILL;
        const charisma = new Determinant();
        charisma.type = DeterminantType.CHARISMA;
        this.determinants.push(speed, battle, shooting, strength, durability, health, attack, initiative,
            dexterity, leaderSkills, intelligence, control, will, charisma);
    }

    updateWith(determinants: CreatureDeterminants): CreatureDeterminants {
        if (determinants.determinants) {
            determinants.determinants.forEach(determinant => {
                const newDeterminant = new Determinant();
                newDeterminant.updateWith(determinant);
                this.replaceDeterminant(newDeterminant);
            });
        }
        return this;
    }

    updateDeterminantValue(value: number, type: string) {
        this.findDeterminant(type).value = value;
    }

    findDeterminant(type: string) {
        return this.determinants.find(determinant => type === determinant.type)
    }

    replaceDeterminant(determinant: Determinant) {
        const toReplace = this.findDeterminant(determinant.type);
        let determinantIndex = this.determinants.indexOf(toReplace);
        this.determinants.splice(determinantIndex, 1);
        this.determinants.push(determinant);
    }
}