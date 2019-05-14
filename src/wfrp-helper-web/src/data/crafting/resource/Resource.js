import Entity from "../../../crud/Entity";

class Resource extends Entity {
    name: string;
    description: string;
    priceMultiplier: number;
    weight: number;
    durability: number;
    strength: number;
    availability: string = 'COMMON';
}

export default Resource;