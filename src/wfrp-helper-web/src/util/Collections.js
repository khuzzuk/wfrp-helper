import Entity from "../crud/Entity";
import {object} from "prop-types";

export const Collections = {
    except: (from: Array<Entity>, except: Array<Entity>) => {
        return from.filter(a => !except.find(b => a.name === b.name));
    },

    removeElement: (from: Array<any>, element: any) => {
        const indexOf = from.indexOf(element);
        if (indexOf >= 0) {
            from.splice(indexOf, 1);
        }
    },

    findByName: (array: Array, element: object) => {
        return array.find(value => value.name === element.name);
    },

    filterByRealm: (array: Array, realmArray: Array) => {
        return array.filter(entity => realmArray.find(realmEntity => entity.name === realmEntity.name));
    },

    flatMap: (array: Array, prop: string) => {
        return array.flatMap(value => value[prop]);
    }
};