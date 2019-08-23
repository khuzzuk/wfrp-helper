import Entity from "../../../../crud/Entity";
import RangedWeapon from "./RangedWeapon";
import Ammunition from "./Ammunition";

export default class PersonalRangedWeapon extends Entity {
    rangedWeapon: RangedWeapon;
    ammunition: Ammunition;
    ammunitionAmount: number = 0;


    updateWith(entity: PersonalRangedWeapon) {
        super.updateWith(entity);
        super.updateEntityProp(entity, 'rangedWeapon', () => new RangedWeapon());
        super.updateEntityProp(entity, 'ammunition', () => new Ammunition());
    }
}