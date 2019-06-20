import Entity from "../../../../crud/Entity";
import SpellSchool from "./SpellSchool";

export default class SpellSchoolLevel extends Entity {
    spellSchool: SpellSchool;
    level: number = 0;


    updateWith(entity: *) {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'spellSchool', () => new SpellSchool());
    }
}