export function replaceByName<T extends {name: string}>(
    elements: T[], element: T) {
    return [...elements.filter(e => e.name !== element.name), element];
}