import Entity from "../model/Entity";

export const Collections = {
  except: (from: Array<Entity>, except: Array<Entity>) => {
    return from.filter(a => !except.find(b => a.name === b.name));
  },

  removeElement: (from: Array<any>, element: any): Array<any> => {
    const indexOf = from.indexOf(element);
    if (indexOf >= 0) {
      from.splice(indexOf, 1);
    }
    return from;
  },

  addEntityIfNew: (element: any, to: Array<any>): Array<any> => {
    if (!to.find(value => value.id === element.id)) {
      to.push(element);
    }
    return to;
  },

  findByName: (array: Array, element: object) => {
    return array.find(value => value.name === element.name);
  },
};

export function findEntity(array: Array<Entity>, element: Entity): Entity {
  return findIn(array, element, ['name']);
}

export function findIn<T>(array: Array<T>,
                          element: T,
                          toMatchPath: string[] = [],
                          elementsPath = toMatchPath): T {
  let toMatch = element;
  toMatchPath.forEach(prop => toMatch = toMatch[prop]);

  return array.find(t => {
    let value = t;
    elementsPath.forEach(prop => value = value[prop]);
    return value === toMatch;
  });
}

export function removeFrom<T>(array: Array<T>, element: T): Array<T> {
  const indexOf = array.indexOf(element);
  if (indexOf >= 0) {
    array.splice(indexOf, 1);
  }
  return array;
}
