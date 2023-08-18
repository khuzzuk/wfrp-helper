import {BaseEntity} from "model/BaseEntity";
import {Determinant} from "model/rule/Determinant";
import {ProfessionClass} from "model/knowledge/ProfessionClass";
import {DescribedEntity} from "model/DescribedEntity";
import {Profession} from "model/knowledge/Profession";
import {Item} from "model/crafting/Item";
import {PersonalRangedWeapon} from "../crafting/RangedWeapon";
import {Armor} from "../crafting/Armor";
import {SpellSchoolLevel} from "../knowledge/SpellSchoolLevel";

export interface Person extends BaseEntity {
  name?: string;
  gender?: any;
  personality?: BaseEntity;
  weight?: number;
  height?: number;
  age?: number;
  hairColor?: BaseEntity;
  eyeColor?: BaseEntity;
  physicalFeatures: DescribedEntity[];
  race?: BaseEntity;
  professionClass?: ProfessionClass;
  determinants: CreatureDeterminants;
  currentProfession?: Profession;
  professions: DescribedEntity[];
  meleeWeapons: Item[];
  rangedWeapons: PersonalRangedWeapon[];
  armor: Armor[];
  inventory: Item[];
  skills: DescribedEntity[];
  spellSchools: SpellSchoolLevel[];
}

export interface CreatureDeterminants {
  determinants: Determinant[];
}

export const createNewPerson = (): Person => {
  return {
    physicalFeatures: [],
    professions: [],
    determinants: {
      determinants: []
    },
    meleeWeapons: [],
    rangedWeapons: [],
    armor: [],
    inventory: [],
    skills: [],
    spellSchools: [],
  };
}
