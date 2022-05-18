import {BaseEntity} from "model/BaseEntity";
import {Determinant} from "model/rule/Determinant";
import DeterminantEntity from "model/rule/DeterminantEntity";
import {ProfessionClass} from "model/knowledge/ProfessionClass";
import {DescribedEntity} from "model/DescribedEntity";
import {Profession} from "model/knowledge/Profession";
import {Item} from "model/crafting/Item";
import {PersonalRangedWeapon} from "../crafting/RangedWeapon";
import {Armor} from "../crafting/Armor";

export interface Person extends DeterminantEntity {
  name?: string;
  gender?: any;
  character?: BaseEntity;
  weight?: number;
  height?: number;
  age?: number;
  hairColor?: BaseEntity;
  eyeColor?: BaseEntity;
  physicalFeatures: DescribedEntity[];
  race?: BaseEntity;
  professionClass?: ProfessionClass;
  determinants: Determinant[];
  currentProfession?: Profession;
  professions: DescribedEntity[];
  meleeWeapons: Item[];
  rangedWeapons: PersonalRangedWeapon[];
  armor: Armor[];
  inventory: Item[];
  skills: DescribedEntity[];
}

export const createNewPerson = (): Person => {
  return {
    physicalFeatures: [],
    professions: [],
    determinants: [],
    meleeWeapons: [],
    rangedWeapons: [],
    armor: [],
    inventory: [],
    skills: [],
  };
}
