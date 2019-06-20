import Entity from "../../crud/Entity";
import Modifier, {ModifierType} from "./Modifier";
import Profession from "../knowledge/profession/Profession";
import DeterminantService from "./DeterminantService";

export default class Determinant extends Entity {
    type: string;
    value: number = 0;
    modifiers: Modifier[] = [];

    updateWith(entity: Determinant) {
        super.updateWith(entity);
        this.updateEntityList(entity, 'modifiers', () => new Modifier());
    }

    getExperienceExtensions() {
        return this.modifiers.filter(mod => mod.type === ModifierType.EXPERIENCE)
    }

    setProfessionExtensions(profession: Profession) {
        const professionExtensions = DeterminantService.findDeterminantIn(profession.determinants, this.type);
        if (professionExtensions) {
            this.modifiers = DeterminantService.removeModifiersByType(this.modifiers, ModifierType.PROFESSION);
            professionExtensions.modifiers.forEach(mod => {
                const newMod = new Modifier();
                newMod.type = mod.type;
                newMod.value = mod.value;
                this.modifiers.push(newMod);
            });
        }
    }

    calculateExperienceValue() {
        return this.value + this.getExperienceExtensions().reduce((a, b) => a + (b.value), 0);
    }
    calculateFinalValue() {
        return this.value + this.modifiers.reduce((a, b) => a + (b.value), 0);
    }
}

export const DeterminantType = {
    SPEED: 'SPEED',
    BATTLE: 'BATTLE',
    SHOOTING: 'SHOOTING',
    STRENGTH: 'STRENGTH',
    DURABILITY: 'DURABILITY',
    HEALTH: 'HEALTH',
    INITIATIVE: 'INITIATIVE',
    ATTACK: 'ATTACK',
    DEXTERITY: 'DEXTERITY',
    LEADER_SKILLS: 'LEADER_SKILLS',
    INTELLIGENCE: 'INTELLIGENCE',
    CONTROL: 'CONTROL',
    WILL: 'WILL',
    CHARISMA: 'CHARISMA',
    PARRY: 'PARRY',
    OPPONENT_PARRY: 'OPPONENT_PARRY',

    allOf(): string[] {
        return [
            this.SPEED,
            this.BATTLE,
            this.SHOOTING,
            this.STRENGTH,
            this.DURABILITY,
            this.HEALTH,
            this.INITIATIVE,
            this.ATTACK,
            this.DEXTERITY,
            this.LEADER_SKILLS,
            this.INTELLIGENCE,
            this.CONTROL,
            this.WILL,
            this.CHARISMA,
            this.PARRY,
            this.OPPONENT_PARRY,
        ];
    },
    personal(): string[] {
        return [
            this.SPEED,
            this.BATTLE,
            this.SHOOTING,
            this.STRENGTH,
            this.DURABILITY,
            this.HEALTH,
            this.INITIATIVE,
            this.ATTACK,
            this.DEXTERITY,
            this.LEADER_SKILLS,
            this.INTELLIGENCE,
            this.CONTROL,
            this.WILL,
            this.CHARISMA,
        ];
    },
};
