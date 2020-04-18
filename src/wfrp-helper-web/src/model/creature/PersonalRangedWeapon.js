import Ammunition   from "../crafting/Ammunition";
import RangedWeapon from "../crafting/RangedWeapon";
import Entity       from "../Entity";

export default class PersonalRangedWeapon extends Entity {
    rangedWeapon: RangedWeapon;
    ammunition: Ammunition;
    ammunitionAmount: number = 0;


    updateWith(entity: PersonalRangedWeapon): PersonalRangedWeapon {
        super.updateWith(entity);
        super.updateEntityProp(entity, 'rangedWeapon', () => new RangedWeapon());
        super.updateEntityProp(entity, 'ammunition', () => new Ammunition());
        return this;
    }
}