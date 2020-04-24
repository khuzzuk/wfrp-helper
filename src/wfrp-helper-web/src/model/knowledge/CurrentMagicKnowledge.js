import Realm from "../realm/Realm";
import SpellSchoolLevel from "./SpellSchoolLevel";
import Skill from "./Skill";

export default class CurrentMagicKnowledge {
    currentSpellSchools: SpellSchoolLevel[] = [];
    currentSkills: Skill[] = [];
    realm: Realm;
}