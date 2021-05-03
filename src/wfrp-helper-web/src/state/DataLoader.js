import Picture from "../img/Picture";
import Ammunition      from "../model/crafting/Ammunition";
import Jewelry from "../model/crafting/Jewelry";
import MeleeWeapon     from "../model/crafting/MeleeWeapon";
import RangedWeapon    from "../model/crafting/RangedWeapon";
import Animal          from "../model/creature/Animal";
import AnimalKind      from "../model/creature/AnimalKind";
import Person          from "../model/creature/Person";
import Realm from "../model/realm/Realm";
import Scenario from "../model/realm/Scenario";
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
import User from "../user/User";
import Role from "../user/Role";

const refreshRegistry = {
    [Nation.entityName]: [],
    [Currency.entityName]: [Nation.entityName],
    [Language.entityName]: [Nation.entityName],
    [Race.entityName]: [],
    [Religion.entityName]: [Nation.entityName],
    [Place.entityName]: [Nation.entityName],
    [Character.entityName]: [],
    [EyeColor.entityName]: [],
    [HairColor.entityName]: [],
    [PhysicalFeature.entityName]: [],
    [AnimalKind.entityName]: [],
    [Animal.entityName]: [AnimalKind.entityName],
    [Skill.entityName]: [],
    [SpellSchool.entityName]: [],
    [Spell.entityName]: [SpellSchool.entityName],
    [ProfessionClass.entityName]: [],
    [Profession.entityName]: [ProfessionClass.entityName],
    [Item.entityName]: [],
    [Armor.entityName]: [Resource.entityName, ArmorBlueprint.entityName, ArmorPattern.entityName],
    [MeleeWeapon.entityName]: [Resource.entityName, MeleeWeaponBlueprint.entityName],
    [RangedWeapon.entityName]: [Resource.entityName, RangedWeaponBlueprint.entityName],
    [Ammunition.entityName]: [Resource.entityName, RangedWeaponBlueprint.entityName],
    [ArmorBlueprint.entityName]: [],
    [MeleeWeaponBlueprint.entityName]: [],
    [RangedWeaponBlueprint.entityName]: [],
    [ArmorPattern.entityName]: [],
    [Jewelry.entityName]: [Resource.entityName],
    [Resource.entityName]: [],
    [Realm.entityName]: [],
    [Scenario.entityName]: [Place.entityName, Person.entityName],
    [Picture.entityName]: [],
    [Person.entityName]: [Currency.entityName,
                          Language.entityName,
                          Race.entityName,
                          Religion.entityName,
                          PhysicalFeature.entityName,
                          Animal.entityName,
                          Skill.entityName,
                          SpellSchool.entityName,
                          Spell.entityName,
                          Profession.entityName,
                          Item.entityName,
                          Armor.entityName,
                          MeleeWeapon.entityName,
                          RangedWeapon.entityName,
                          Jewelry.entityName],
    [User.entityName]: [],
    [Role.entityName]: [],
};

export default class DataLoader {
    static refreshData() {
        Object.keys(State.services).forEach(serviceName => State.services[serviceName].loadData());
    }

    static refreshForEntity(entityName: string) {
        State.services[entityName].loadData();
        refreshRegistry[entityName].forEach(supportedEntity => this.refreshForEntity(supportedEntity));
    }
}