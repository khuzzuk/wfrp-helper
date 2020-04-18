import {State} from "../../state/State";

export const Placement = {
    BODY: 'BODY',
    HEAD: 'HEAD',
    TORSO: 'TORSO',
    HAND: 'HAND',
    LEG: 'LEG',
    BELT: 'BELT',
    NECK: 'NECK',
    FINGER: 'FINGER',
    SHIELD: 'SHIELD',
    BOTH_HANDS: 'BOTH_HANDS',

    allOf() {
        return [
            this.BODY,
            this.HEAD,
            this.TORSO,
            this.HAND,
            this.LEG,
            this.BELT,
            this.NECK,
            this.FINGER,
            this.SHIELD,
            this.BOTH_HANDS,
        ];
    },

    armor() {
        return [
            this.BODY,
            this.HEAD,
            this.TORSO,
            this.HAND,
            this.LEG,
            this.BELT,
            this.SHIELD,
        ];
    },

    weapon() {
        return [
            this.HAND,
            this.BOTH_HANDS,
            this.SHIELD,
        ];
    },

    jewelry() {
        return [
            this.NECK,
            this.FINGER,
        ];
    },
};

export const placementName = 'placement';
export const placementArmorName = 'placementArmor';
export const placementWeaponName = 'placementWeapon';
export const placementJewelryName = 'placementJewelry';

State.data[placementName] = Placement.allOf();
State.data[placementArmorName] = Placement.armor();
State.data[placementWeaponName] = Placement.weapon();
State.data[placementJewelryName] = Placement.jewelry();