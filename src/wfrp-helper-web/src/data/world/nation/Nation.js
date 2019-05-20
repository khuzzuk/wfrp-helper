import Entity from "../../../crud/Entity";

class Nation extends Entity {
    name: string;
    description: string;
    names: string[] = [];
}

export default Nation;