import Person from "../creature/Person";
import ModelElement from "../ModelElement";
import Currency from "../world/Currency";
import Language from "../world/Language";
import Nation from "../world/Nation";
import Religion from "../world/Religion";

export default class RealmData extends ModelElement {
    nations: Nation[] = [];
    languages: Language[] = [];
    religions: Religion[] = [];
    currencies: Currency[] = [];
    persons: Person[] = [];


    updateWith(entity: RealmData): RealmData {
        this.updateEntityList(entity, 'nations', () => new Nation());
        this.updateEntityList(entity, 'languages', () => new Language());
        this.updateEntityList(entity, 'religions', () => new Religion());
        this.updateEntityList(entity, 'currencies', () => new Currency());
        this.updateEntityList(entity, 'persons', () => new Person());
        return this;
    }
}