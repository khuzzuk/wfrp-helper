import Entity from "../../crud/Entity";
import HairColor from "../look/hairColor/HairColor";
import EyeColor from "../look/eyeColor/EyeColor";
import PhysicalFeature from "../look/physicalFeatures/PhysicalFeature";
import PersonDeterminants from "./PersonDeterminants";
import Profession from "../knowledge/profession/Profession";
import ProfessionClass from "../knowledge/profession/ProfessionClass";
import Skill from "../knowledge/skill/Skill";
import MeleeWeapon from "../crafting/item/melee/MeleeWeapon";
import Armor from "../crafting/item/armor/Armor";
import Spell from "../knowledge/magic/spell/Spell";
import Animal from "./Animal";
import Character from "../look/character/Character";
import SpellSchoolLevel from "../knowledge/magic/spellSchool/SpellSchoolLevel";
import Race from "../world/race/Race";
import Nation from "../world/nation/Nation";
import Religion from "../world/religion/Religion";
import Money from "../world/money/Money";
import Inventory from "../crafting/item/Inventory";
import Language from "../world/language/Language";
import PersonalRangedWeapon from "../crafting/item/ranged/PersonalRangedWeapon";

export default class Person extends Entity {
    name: string;
    gender: string;
    age: number;
    height: number;
    weight: number;
    fatePoints: number;
    mana: number;
    currentMana: number;
    sanityPoints: number;
    totalExperience: number;
    experience: number;
    birthplace: string;
    parents: string;
    family: string;
    health: string;
    nation: Nation;
    religion: Religion;
    hairColor: HairColor;
    eyeColor: EyeColor;
    physicalFeatures: PhysicalFeature[] = [];
    race: Race;
    personality: Character;
    description: string;
    history: string;
    determinants: PersonDeterminants = new PersonDeterminants();
    professionClass: ProfessionClass;
    currentProfession: Profession;
    professions: Profession[] = [];
    skills: Skill[] = [];
    inventory: Inventory[] = [];
    meleeWeapons: MeleeWeapon[] = [];
    rangedWeapons: PersonalRangedWeapon[] = [];
    armor: Armor[] = [];
    spellSchools: SpellSchoolLevel[] = [];
    spells: Spell[] = [];
    animals: Animal[] = [];
    money: Money[] = [];
    languages: Language[] = [];

    updateWith(entity: *) {
        this.updateProp(entity, 'id');
        this.updateProp(entity, 'uuid');
        this.updateProp(entity, 'name');
        this.updateProp(entity, 'gender');
        this.updateProp(entity, 'age');
        this.updateProp(entity, 'height');
        this.updateProp(entity, 'weight');
        this.updateProp(entity, 'fatePoints');
        this.updateProp(entity, 'mana');
        this.updateProp(entity, 'currentMana');
        this.updateProp(entity, 'sanityPoints');
        this.updateProp(entity, 'totalExperience');
        this.updateProp(entity, 'experience');
        this.updateProp(entity, 'birthplace');
        this.updateProp(entity, 'parents');
        this.updateProp(entity, 'family');

        this.updateEntityProp(entity, 'nation', () => new Nation());
        this.updateEntityProp(entity, 'religion', () => new Religion());
        this.updateEntityProp(entity, 'hairColor', () => new HairColor());
        this.updateEntityProp(entity, 'eyeColor', () => new EyeColor());
        this.updateEntityProp(entity, 'race', () => new Race());
        this.updateEntityProp(entity, 'personality', () => new Character());
        this.updateEntityProp(entity, 'determinants', () => new PersonDeterminants());
        this.updateEntityProp(entity, 'professionClass', () => new ProfessionClass());
        this.updateEntityProp(entity, 'currentProfession', () => new Profession());

        this.updateEntityList(entity, 'physicalFeatures', () => new PhysicalFeature());
        this.updateEntityList(entity, 'professions', () => new Profession());
        this.updateEntityList(entity, 'skills', () => new Skill());
        this.updateEntityList(entity, 'inventory', () => new Inventory());
        this.updateEntityList(entity, 'meleeWeapons', () => new MeleeWeapon());
        this.updateEntityList(entity, 'rangedWeapons', () => new PersonalRangedWeapon());
        this.updateEntityList(entity, 'armor', () => new Armor());
        this.updateEntityList(entity, 'spellSchools', () => new SpellSchoolLevel());
        this.updateEntityList(entity, 'spells', () => new Spell());
        this.updateEntityList(entity, 'animals', () => new Animal());
        this.updateEntityList(entity, 'money', () => new Money());
        this.updateEntityList(entity, 'languages', () => new Language());
    }
}