import Modifier, {ModifierType} from "./Modifier";
import Entity                   from "../Entity";

export default class Determinant extends Entity {
    type: string;
    value: number = 0;
    modifiers: Modifier[] = [];

    updateWith(entity: Determinant): Determinant {
        super.updateWith(entity);
        this.updateEntityList(entity, 'modifiers', () => new Modifier());
        return this;
    }

    getExperienceExtensions() {
        return this.modifiers.filter(mod => mod.type === ModifierType.EXPERIENCE)
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
