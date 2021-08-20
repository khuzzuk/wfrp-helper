import {FieldType} from "entity/FieldType";
import {Availability} from "./crafting/Availability";
import {Placement} from "./crafting/Placement";

export enum ModelType {
    USER = 'USER',
    AUTHORITY = 'AUTHORITY',

    SKILL = 'SKILL',
    PROFESSION_CLASS = 'PROFESSION_CLASS',
    PROFESSION = 'PROFESSION',
    SPELL_SCHOOL = 'SPELL_SCHOOL',
    SPELL = 'SPELL',
    NATION = 'NATION',
    LANGUAGE = 'LANGUAGE',
    CURRENCY = 'CURRENCY',
    MONEY = 'MONEY',
    RELIGION = 'RELIGION',
    RACE = 'RACE',
    PLACE = 'PLACE',
    RESOURCE = 'RESOURCE',
    ARMOR_PATTERN = 'ARMOR_PATTERN',
    ARMOR_BLUEPRINT = 'ARMOR_BLUEPRINT',
    MELEE_WEAPON_BLUEPRINT = 'MELEE_WEAPON_BLUEPRINT',
    RANGED_WEAPON_BLUEPRINT = 'RANGED_WEAPON_BLUEPRINT',
    MISC_ITEM = 'MISC_ITEM',
    JEWELRY = 'JEWELRY',
    ARMOR = 'ARMOR',
}

export interface FieldDef {
    prop: string;
    type: FieldType;
    linked?: ModelType;
    options?: (entity: any) => string;
    data?: string[];
    translate?: boolean;
}

export interface ModelDef {
    name: string;
    table: FieldDef[],
    form: FieldDef[],
}

let ModelConfig: {[key in ModelType]: ModelDef};
ModelConfig = {
    USER: {
        name: 'user',
        table: [
            {prop: 'username', type: FieldType.TEXT},
            {prop: 'oneTimePassword', type: FieldType.BOOLEAN},
        ],
        form: [
            {prop: 'username', type: FieldType.TEXT},
            {prop: 'oneTimePassword', type: FieldType.BOOLEAN},
        ],
    },

    AUTHORITY: {
        name: 'role',
        table: [
            {prop: 'authority', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'authority', type: FieldType.TEXT}
        ],
    },

    SKILL: {
        name: 'skill',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT},
        ],
    },

    PROFESSION_CLASS: {
        name: 'professionClass',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'skills', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.SKILL},
        ],
    },

    PROFESSION: {
        name: 'profession',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'professionClass', type: FieldType.ENTITY_SELECT, linked: ModelType.PROFESSION_CLASS},
            {prop: 'skills', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.SKILL},
            {prop: 'determinants', type: FieldType.DETERMINANT},
            {prop: 'nextProfessions', type: FieldType.ENUM_MULTISELECT, linked: ModelType.PROFESSION, options: p => p.name}
        ],
    },

    SPELL_SCHOOL: {
        name: 'spellSchool',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'levels', type: FieldType.TEXT},
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'levels', type: FieldType.INTEGER},
        ],
    },

    SPELL: {
        name: 'spell',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'level', type: FieldType.TEXT},
            {prop: 'range', type: FieldType.TEXT},
            {prop: 'manaCost', type: FieldType.TEXT},
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'effect', type: FieldType.TEXT_AREA},
            {prop: 'level', type: FieldType.INTEGER},
            {prop: 'manaCost', type: FieldType.INTEGER},
            {prop: 'range', type: FieldType.INTEGER},
            {prop: 'prepareTime', type: FieldType.ACTION_TIME},
            {prop: 'durationTime', type: FieldType.ACTION_TIME},
            {prop: 'spellSchool', type: FieldType.ENTITY_SELECT, linked: ModelType.SPELL_SCHOOL},
        ],
    },

    NATION: {
        name: 'nation',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'names', type: FieldType.TEXT_ARRAY},
        ],
    },

    LANGUAGE: {
        name: 'worldLanguage',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'nations', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.NATION},
        ],
    },
    CURRENCY: {
        name: 'currency',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'valueMultiplier', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'valueMultiplier', type: FieldType.FLOAT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'nations', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.NATION},
        ],
    },
    MONEY: {
        name: 'money',
        table: [],
        form: [],
    },
    RELIGION: {
        name: 'religion',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'nations', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.NATION},
        ],
    },
    RACE: {
        name: 'race',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'specialFeatures', type: FieldType.TEXT_AREA},
            {prop: 'determinants', type: FieldType.DETERMINANT},
            {prop: 'nations', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.NATION},
        ],
    },

    PLACE: {
        name: 'place',
        table: [
            {prop: 'name', type: FieldType.TEXT},
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'nation', type: FieldType.ENTITY_SELECT, linked: ModelType.NATION},
        ],
    },

    RESOURCE: {
        name: 'resource',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'priceMultiplier', type: FieldType.TEXT},
            {prop: 'weight', type: FieldType.TEXT},
            {prop: 'durability', type: FieldType.TEXT},
            {prop: 'strength', type: FieldType.TEXT},
            {prop: 'availability', type: FieldType.TEXT, translate: true},
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'priceMultiplier', type: FieldType.FLOAT},
            {prop: 'weight', type: FieldType.FLOAT},
            {prop: 'durability', type: FieldType.FLOAT},
            {prop: 'strength', type: FieldType.FLOAT},
            {prop: 'availability', type: FieldType.ENUM_SELECT, data: Object.keys(Availability), translate: true},
        ],
    },

    ARMOR_PATTERN: {
        name: 'armorPattern',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'priceMultiplier', type: FieldType.TEXT},
            {prop: 'weight', type: FieldType.TEXT},
            {prop: 'strength', type: FieldType.TEXT},
            {prop: 'availability', type: FieldType.TEXT, translate: true},
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'priceMultiplier', type: FieldType.FLOAT},
            {prop: 'weight', type: FieldType.FLOAT},
            {prop: 'strength', type: FieldType.FLOAT},
            {prop: 'availability', type: FieldType.ENUM_SELECT, data: Object.keys(Availability), translate: true},
        ],
    },
    ARMOR_BLUEPRINT: {
        name: 'armorBlueprint',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'armor', type: FieldType.TEXT},
            {prop: 'placement', type: FieldType.TEXT},
            {prop: 'suggestedPrice', type: FieldType.PRICE},
            {prop: 'suggestedWeight', type: FieldType.TEXT},
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'armor', type: FieldType.INTEGER},
            {prop: 'placement', type: FieldType.ENUM_MULTISELECT, data: [Placement.HEAD, Placement.TORSO, Placement.HAND, Placement.LEG, Placement.BELT, Placement.SHIELD], translate: true},
            {prop: 'suggestedPrice', type: FieldType.PRICE},
            {prop: 'suggestedWeight', type: FieldType.FLOAT},
            {prop: 'determinants', type: FieldType.DETERMINANT},
        ],
    },
    MELEE_WEAPON_BLUEPRINT: {
        name: 'meleeWeaponBlueprint',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'placement', type: FieldType.TEXT},
            {prop: 'suggestedPrice', type: FieldType.PRICE},
            {prop: 'suggestedWeight', type: FieldType.TEXT},
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'placement', type: FieldType.ENUM_MULTISELECT, data: [Placement.HAND, Placement.BOTH_HANDS, Placement.SHIELD], translate: true},
            {prop: 'prepareTime', type: FieldType.ACTION_TIME},
            {prop: 'suggestedPrice', type: FieldType.PRICE},
            {prop: 'suggestedWeight', type: FieldType.FLOAT},
            {prop: 'determinants', type: FieldType.DETERMINANT},
        ],
    },
    RANGED_WEAPON_BLUEPRINT: {
        name: 'rangedWeaponBlueprint',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'placement', type: FieldType.TEXT},
            {prop: 'suggestedPrice', type: FieldType.PRICE},
            {prop: 'suggestedWeight', type: FieldType.TEXT},
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'placement', type: FieldType.ENUM_MULTISELECT, data: [Placement.HAND, Placement.BOTH_HANDS, Placement.SHIELD], translate: true},
            {prop: 'prepareTime', type: FieldType.ACTION_TIME},
            {prop: 'minimumRange', type: FieldType.INTEGER},
            {prop: 'mediumRange', type: FieldType.INTEGER},
            {prop: 'maximumRange', type: FieldType.INTEGER},
            {prop: 'suggestedPrice', type: FieldType.PRICE},
            {prop: 'suggestedWeight', type: FieldType.FLOAT},
            {prop: 'determinants', type: FieldType.DETERMINANT},
        ],
    },
    MISC_ITEM: {
        name: 'miscItem',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'price', type: FieldType.PRICE},
            {prop: 'weight', type: FieldType.TEXT},
            {prop: 'availability', type: FieldType.TEXT, translate: true},
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'weight', type: FieldType.FLOAT},
            {prop: 'price', type: FieldType.PRICE},
            {prop: 'availability', type: FieldType.ENUM_SELECT, data: Object.keys(Availability), translate: true},
        ],
    },
    JEWELRY: {
        name: 'jewelry',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'price', type: FieldType.PRICE},
            {prop: 'weight', type: FieldType.TEXT},
            {prop: 'availability', type: FieldType.TEXT, translate: true},
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'weight', type: FieldType.FLOAT},
            {prop: 'price', type: FieldType.PRICE},
            {prop: 'availability', type: FieldType.ENUM_SELECT, data: Object.keys(Availability), translate: true},
            {prop: 'placement', type: FieldType.ENUM_SELECT, data: [Placement.NECK, Placement.FINGER], translate: true},
            {prop: 'primaryResource', type: FieldType.ENTITY_SELECT, linked: ModelType.RESOURCE},
            {prop: 'secondaryResource', type: FieldType.ENTITY_SELECT, linked: ModelType.RESOURCE},
            {prop: 'determinants', type: FieldType.DETERMINANT},
        ],
    },
    ARMOR: {
        name: 'armor',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'price', type: FieldType.PRICE},
            {prop: 'weight', type: FieldType.TEXT},
            {prop: 'availability', type: FieldType.TEXT, translate: true},
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'type', type: FieldType.ENTITY_SELECT, linked: ModelType.ARMOR_BLUEPRINT},
            {prop: 'armorPattern', type: FieldType.ENTITY_SELECT, linked: ModelType.ARMOR_PATTERN},
            {prop: 'weight', type: FieldType.FLOAT},
            {prop: 'price', type: FieldType.PRICE},
            {prop: 'availability', type: FieldType.ENUM_SELECT, data: Object.keys(Availability), translate: true},
            {prop: 'primaryResource', type: FieldType.ENTITY_SELECT, linked: ModelType.RESOURCE},
            {prop: 'secondaryResource', type: FieldType.ENTITY_SELECT, linked: ModelType.RESOURCE},
            {prop: 'determinants', type: FieldType.DETERMINANT},
        ],
    },
}

export default ModelConfig;