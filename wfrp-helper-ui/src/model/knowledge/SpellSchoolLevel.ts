import {BaseEntity} from "../BaseEntity";
import {SpellSchool} from "./SpellSchool";

export interface SpellSchoolLevel extends BaseEntity {
  spellSchool: SpellSchool;
  level: number;
}