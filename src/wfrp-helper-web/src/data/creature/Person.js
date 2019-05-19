import Entity from "../../crud/Entity";
import HairColor from "../look/hairColor/HairColor";
import EyeColor from "../look/eyeColor/EyeColor";
import PhysicalFeature from "../look/physicalFeatures/PhysicalFeature";
import PersonDeterminants from "./PersonDeterminants";
import Profession from "../knowledge/profession/Profession";
import ProfessionClass from "../knowledge/profession/ProfessionClass";
import Skill from "../knowledge/skill/Skill";
import Item from "../crafting/item/Item";
import MeleeWeapon from "../crafting/item/melee/MeleeWeapon";
import RangedWeapon from "../crafting/item/ranged/RangedWeapon";
import Armor from "../crafting/item/armor/Armor";
import SpellSchool from "../knowledge/magic/spellSchool/SpellSchool";
import Spell from "../knowledge/magic/spell/Spell";
import Animal from "./Animal";
import Character from "../look/character/Character";
import SpellSchoolLevel from "../knowledge/magic/spellSchool/SpellSchoolLevel";
import Race from "../world/race/Race";

export default class Person extends Entity {
    name: string;
    gender: string;
    age: number;
    height: number;
    weight: number;
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
    inventory: Item[] = [];
    meleeWeapons: MeleeWeapon[] = [];
    rangedWeapons: RangedWeapon[] = [];
    armor: Armor[] = [];
    spellSchools: SpellSchoolLevel[] = [];
    spells: Spell[] = [];
    animals: Animal[] = [];

    updateWith(entity: *) {
        if (entity.id) {
            this.id = entity.id;
        }
        if (entity.uuid) {
            this.uuid = entity.uuid;
        }

        if (entity.name) {
            this.name = entity.name;
        }

        if (entity.gender) {
            this.gender = entity.gender;
        }

        if (entity.age) {
            this.age = entity.age;
        }

        if (entity.height) {
            this.height = entity.height;
        }

        if (entity.weight) {
            this.weight = entity.weight;
        }

        if (entity.hairColor) {
            this.hairColor = new HairColor();
            this.hairColor.updateWith(entity.hairColor);
        }

        if (entity.eyeColor) {
            this.eyeColor = new EyeColor();
            this.eyeColor.updateWith(entity.eyeColor);
        }

        if (entity.race) {
            this.race = new Race();
            this.race.updateWith(entity.race);
        }

        if (entity.physicalFeatures) {
            this.physicalFeatures = entity.physicalFeatures
                .map(feat => {
                    const newFeat = new PhysicalFeature();
                    newFeat.updateWith(feat);
                    return newFeat;
                });
        }

        if (entity.personality) {
            this.personality = new Character();
            this.personality.updateWith(entity.personality);
        }

        if (entity.determinants) {
            this.determinants = new PersonDeterminants();
            this.determinants.updateWith(entity.determinants);
        }

        if (entity.professionClass) {
            this.professionClass = new ProfessionClass();
            this.professionClass.updateWith(entity.professionClass);
        }

        if (entity.currentProfession) {
            this.currentProfession = new Profession();
            this.currentProfession.updateWith(entity.currentProfession);
        }

        if (entity.professions) {
            this.professions = entity.professions
                .map(prof => {
                    const newProf = new Profession();
                    newProf.updateWith(prof);
                    return newProf;
                });
        }

        if (entity.skills) {
            this.skills = entity.skills
                .map(skill => {
                    const newSkill = new Skill();
                    newSkill.updateWith(skill);
                    return newSkill;
                });
        }
    }
}