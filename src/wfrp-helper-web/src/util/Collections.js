import Entity from "../crud/Entity";

export const Collections = {
    except: (from: Array<Entity>, except: Array<Entity>) => {
        return from.filter(a => !except.find(b => a.name === b.name));
    },
};