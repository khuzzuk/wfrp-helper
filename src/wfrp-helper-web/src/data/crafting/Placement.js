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

    representationMapping: new Map(),

    toRepresentation(placements: string[]): string[] {
        return placements.map(value => this.representationMapping.get(value)).join(', ')
    }
};

Placement.representationMapping.set(Placement.BODY, 'całe ciało');
Placement.representationMapping.set(Placement.HEAD, 'głowa');
Placement.representationMapping.set(Placement.TORSO, 'korpus');
Placement.representationMapping.set(Placement.HAND, 'ręce');
Placement.representationMapping.set(Placement.LEG, 'nogi');
Placement.representationMapping.set(Placement.BELT, 'pas');
Placement.representationMapping.set(Placement.NECK, 'szyja');
Placement.representationMapping.set(Placement.FINGER, 'palec');
Placement.representationMapping.set(Placement.SHIELD, 'tarcza');
Placement.representationMapping.set(Placement.BOTH_HANDS, 'obie ręce');