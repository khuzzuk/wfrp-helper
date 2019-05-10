import Determinant from "../rule/Determinant";

const determinantsNames = ['speed', 'battle', 'shooting', 'strength', 'durability', 'health', 'attack', 'initiative', 'dexterity', 'leaderSkills', 'intelligence', 'control', 'will', 'charisma'];

export default class PersonDeterminants {
    speed: Determinant = new Determinant();
    battle: Determinant = new Determinant();
    shooting: Determinant = new Determinant();
    strength: Determinant = new Determinant();
    durability: Determinant = new Determinant();
    health: Determinant = new Determinant();
    attack: Determinant = new Determinant();
    initiative: Determinant = new Determinant();
    dexterity: Determinant = new Determinant();
    leaderSkills: Determinant = new Determinant();
    intelligence: Determinant = new Determinant();
    control: Determinant = new Determinant();
    will: Determinant = new Determinant();
    charisma: Determinant = new Determinant();

    updateWith(determinants: PersonDeterminants) {
        determinantsNames.forEach(determinantName => {
            if (determinants[determinantName]) {
                this[determinantName] = new Determinant();
                this[determinantName].updateWith(determinants[determinantName]);
            }
        });
    }
}