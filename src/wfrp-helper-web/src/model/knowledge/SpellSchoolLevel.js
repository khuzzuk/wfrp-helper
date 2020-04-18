import Entity from "../Entity";
import SpellSchool from "./SpellSchool";

export default class SpellSchoolLevel extends Entity {
    spellSchool: SpellSchool;
    level: number = 0;


    updateWith(entity: *): SpellSchoolLevel {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'spellSchool', () => new SpellSchool());
        return this;
    }
}