import RequestService from "../../../connection/RequestService";
import {func} from "prop-types";
import Person from "../../creature/Person";
import Armor from "./armor/Armor";

export default class GearService extends RequestService {
    calculateMeleeDamage(weaponId: number, onResponse: func) {
        this.rawGetRequestFor(`gear/getMeleeWeaponDamage/${weaponId}`, onResponse);
    }

    calculateArmorValue(armorId: number, onResponse: func) {
        this.rawGetRequestFor(`gear/getArmorValue/${armorId}`, onResponse);
    }

    calculatePersonArmorValue(armorIds: number[], onResponse: func) {
        this.requestFor(armorIds, 'helper/int', onResponse)
    }
}