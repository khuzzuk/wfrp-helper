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
import Spell from "../knowledge/magic/spell/Spell";
import Animal from "./Animal";
import Character from "../look/character/Character";
import SpellSchoolLevel from "../knowledge/magic/spellSchool/SpellSchoolLevel";
import Race from "../world/race/Race";
import Nation from "../world/nation/Nation";
import Religion from "../world/religion/Religion";
import Money from "../world/money/Money";

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
    inventory: Item[] = [];
    meleeWeapons: MeleeWeapon[] = [];
    rangedWeapons: RangedWeapon[] = [];
    armor: Armor[] = [];
    spellSchools: SpellSchoolLevel[] = [];
    spells: Spell[] = [];
    animals: Animal[] = [];
    money: Money[] = [];

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

        if (entity.fatePoints) {
            this.fatePoints = entity.fatePoints;
        }

        if (entity.mana) {
            this.mana = entity.mana;
        }

        if (entity.currentMana) {
            this.currentMana = entity.currentMana;
        }

        if (entity.sanityPoints) {
            this.sanityPoints = entity.sanityPoints;
        }

        if (entity.totalExperience) {
            this.totalExperience = entity.totalExperience;
        }

        if (entity.experience) {
            this.experience = entity.experience;
        }

        if (entity.birthplace) {
            this.birthplace = entity.birthplace;
        }

        if (entity.parents) {
            this.parents = entity.parents;
        }

        if (entity.family) {
            this.family = entity.family;
         }

        if (entity.nation) {
            this.nation = new Nation();
            this.nation.updateWith(entity.nation);
        }

        if (entity.religion) {
            this.religion = new Religion();
            this.religion.updateWith(entity.religion);
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

        if (entity.meleeWeapons) {
            this.meleeWeapons = entity.meleeWeapons
                .map(weapon => {
                    const newWeapon = new MeleeWeapon();
                    newWeapon.updateWith(weapon);
                    return newWeapon;
                })
        }
        if (entity.rangedWeapons) {
            this.rangedWeapons = entity.rangedWeapons
                .map(weapon => {
                    const newWeapon = new RangedWeapon();
                    newWeapon.updateWith(weapon);
                    return newWeapon;
                })
        }
        if (entity.armor) {
            this.armor = entity.armor
                .map(armor => {
                    const newArmor = new Armor();
                    newArmor.updateWith(armor);
                    return newArmor;
                })
        }

        if (entity.spellSchools) {
            this.spellSchools = entity.spellSchools
                .map(spellSchool => {
                    const newSpellSchool = new SpellSchoolLevel();
                    newSpellSchool.updateWith(spellSchool);
                    return newSpellSchool;
                })
        }
        if (entity.spells) {
            this.spells = entity.spells
                .map(spell => {
                    const newSpell = new Spell();
                    newSpell.updateWith(spell);
                    return newSpell;
                })
        }
        if (entity.animals) {
            this.animals = entity.animals
                .map(animal => {
                    const newAnimal = new Animal();
                    newAnimal.updateWith(animal);
                    return newAnimal;
                })
        }

        if (entity.money) {
            this.money = entity.money
                .map(money => {
                    const newMoney = new Money();
                    newMoney.updateWith(money);
                    return newMoney;
                })
        }
    }
}