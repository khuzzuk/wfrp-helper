import {FormFieldType}                        from "../../form/FormFieldType";
import Armor                                  from "../crafting/Armor";
import Inventory                              from "../crafting/Inventory";
import MeleeWeapon                                             from "../crafting/MeleeWeapon";
import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import Skill                                                   from "../knowledge/Skill";
import Spell                                  from "../knowledge/Spell";
import SpellSchoolLevel                       from "../knowledge/SpellSchoolLevel";
import Profession                             from "../professions/Profession";
import ProfessionClass                        from "../professions/ProfessionClass";
import Language                               from "../world/Language";
import Money                                  from "../world/Money";
import Nation                                 from "../world/Nation";
import Race                                   from "../world/Race";
import Religion                               from "../world/Religion";
import Animal                                 from "./Animal";
import Character                              from "./Character";
import CreatureDeterminants                   from "./CreatureDeterminants";
import EyeColor                               from "./EyeColor";
import HairColor                              from "./HairColor";
import PersonalRangedWeapon                   from "./PersonalRangedWeapon";
import PhysicalFeature                        from "./PhysicalFeature";

export default class Person extends Entity {
  static entityName: string = 'person';

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
  determinants: CreatureDeterminants = new CreatureDeterminants();
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

  updateWith(entity: *): Person {
    this.updateProp(entity, 'id');
    this.updateProp(entity, 'uuid');
    this.updateProp(entity, 'name');
    this.updateProp(entity, 'gender');
    this.updateNumProp(entity, 'age');
    this.updateNumProp(entity, 'height');
    this.updateNumProp(entity, 'weight');
    this.updateNumProp(entity, 'fatePoints');
    this.updateNumProp(entity, 'mana');
    this.updateNumProp(entity, 'currentMana');
    this.updateNumProp(entity, 'sanityPoints');
    this.updateNumProp(entity, 'totalExperience');
    this.updateNumProp(entity, 'experience');
    this.updateProp(entity, 'birthplace');
    this.updateProp(entity, 'parents');
    this.updateProp(entity, 'family');
    this.updateProp(entity, 'health');

    this.updateEntityProp(entity, 'nation', () => new Nation());
    this.updateEntityProp(entity, 'religion', () => new Religion());
    this.updateEntityProp(entity, 'hairColor', () => new HairColor());
    this.updateEntityProp(entity, 'eyeColor', () => new EyeColor());
    this.updateEntityProp(entity, 'race', () => new Race());
    this.updateEntityProp(entity, 'personality', () => new Character());
    this.updateEntityProp(entity, 'determinants', () => new CreatureDeterminants());
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

    return this;
  }
}

RegisterEntity(Person,
               [CreateColumn('name', FormFieldType.TEXT),
                CreateColumn('race', FormFieldType.ENTITY_SELECT),
                CreateColumn('nation', FormFieldType.ENTITY_SELECT),
                CreateColumn('currentProfession', FormFieldType.ENTITY_SELECT),
                CreateColumn('totalExperience', FormFieldType.TEXT),],
               [CreateFormField('person', FormFieldType.CHARACTER_SHEET)]);