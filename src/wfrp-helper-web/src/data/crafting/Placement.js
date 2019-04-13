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
    }
};