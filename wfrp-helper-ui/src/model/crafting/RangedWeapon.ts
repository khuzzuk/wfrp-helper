import {Item} from "model/crafting/Item";
import {DescribedEntity} from "model/DescribedEntity";
import DeterminantEntity from "model/rule/DeterminantEntity";
import {Determinant} from "model/rule/Determinant";
import {BaseEntity} from "model/BaseEntity";
import {ActionTime} from "model/rule/ActionTime";
import {Ammunition} from "./Ammunition";

export class RangedWeapon extends Item {
    type: RangedWeaponBlueprint = new RangedWeaponBlueprint();
}

export class RangedWeaponBlueprint extends DescribedEntity implements DeterminantEntity {
    determinants: Determinant[] = [];
    minimumRange: number = 0;
    mediumRange: number = 0;
    maximumRange: number = 0;
    prepareTime: ActionTime = new ActionTime();
}

export class PersonalRangedWeapon extends BaseEntity {
    rangedWeapon: RangedWeapon = new RangedWeapon();
    ammunition?: Ammunition;
    ammunitionAmount: number = 0;
}
