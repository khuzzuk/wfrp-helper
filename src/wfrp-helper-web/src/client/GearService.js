import {func} from "prop-types";
import RangedWeapon from "../model/crafting/RangedWeapon";
import PersonalRangedWeapon from "../model/creature/PersonalRangedWeapon";
import {State} from "../state/State";
import RemoteService from "./RemoteService";

export default class GearService extends RemoteService {
    calculateMeleeDamage(weaponId: number, onResponse: func) {
        this.rawGetRequestFor(`gear/getMeleeWeaponDamage/${weaponId}`, onResponse);
    }

    calculateArmorValue(armorId: number, onResponse: func) {
        this.rawGetRequestFor(`gear/getArmorValue/${armorId}`, onResponse);
    }

    calculatePersonArmorValue(armorIds: number[], onResponse: func) {
        this.requestFor(armorIds, 'gear/getArmorValuesForGear', onResponse)
    }

    static addPersonalRangedWeapon(rangedWeapon: RangedWeapon) {
        const pWeps = State.data.entity.rangedWeapons;
        const newPWep = new PersonalRangedWeapon();
        newPWep.rangedWeapon = rangedWeapon;
        pWeps.push(newPWep);
        State.updateEntity({rangedWeapons: pWeps});
    }
}