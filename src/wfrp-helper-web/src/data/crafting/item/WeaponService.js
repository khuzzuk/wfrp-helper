import RequestService from "../../../connection/RequestService";
import {func} from "prop-types";

export default class WeaponService extends RequestService {
    calculateMeleeDamage(weaponId: number, onResponse: func) {
        this.rawGetRequestFor(`weapon/getMeleeWeaponDamage/${weaponId}`, onResponse);
    }
}