import Picture from "../img/Picture";
import Ammunition      from "../model/crafting/Ammunition";
import MeleeWeapon     from "../model/crafting/MeleeWeapon";
import RangedWeapon    from "../model/crafting/RangedWeapon";
import Animal          from "../model/creature/Animal";
import AnimalKind      from "../model/creature/AnimalKind";
import Person          from "../model/creature/Person";
import Realm from "../model/realm/Realm";
import Place from "../model/world/Place";
import {State}         from "./State";
import Nation          from "../model/world/Nation";
import Currency        from "../model/world/Currency";
import Language        from "../model/world/Language";
import Race            from "../model/world/Race";
import Religion        from "../model/world/Religion";
import Character       from "../model/creature/Character";
import Skill           from "../model/knowledge/Skill";
import ProfessionClass from "../model/professions/ProfessionClass";
import Profession      from "../model/professions/Profession";
import SpellSchool from "../model/knowledge/SpellSchool";
import Item                  from "../model/crafting/Item";
import {Availability}        from "../model/crafting/Availability";
import ArmorBlueprint        from "../model/crafting/ArmorBlueprint";
import Spell                 from "../model/knowledge/Spell";
import MeleeWeaponBlueprint  from "../model/crafting/MeleeWeaponBlueprint";
import RangedWeaponBlueprint from "../model/crafting/RangedWeaponBlueprint";
import ArmorPattern          from "../model/crafting/ArmorPattern";
import Resource              from "../model/crafting/Resource";
import EyeColor              from "../model/creature/EyeColor";
import HairColor             from "../model/creature/HairColor";
import PhysicalFeature       from "../model/creature/PhysicalFeature";
import Armor                 from "../model/crafting/Armor";

const DOMAINS = [
    Nation, Currency, Language, Race, Religion, Place,
    Character, EyeColor, HairColor, PhysicalFeature,
    AnimalKind, Animal,
    Skill, SpellSchool, Spell,
    ProfessionClass, Profession,
    Availability,
    Item, Armor, MeleeWeapon, RangedWeapon, Ammunition,
    ArmorBlueprint, MeleeWeaponBlueprint, RangedWeaponBlueprint,
    ArmorPattern, Resource,
    Person, Realm,
    Picture,
];

export default class DataLoader {
    static refreshData() {
        Object.keys(State.services).forEach(serviceName => State.services[serviceName].loadData());
    }
}