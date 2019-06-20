import ModelElement from "./ModelElement";

class Entity extends ModelElement {
    id: number;
    version: number;
    uuid: string;
}

export default Entity;