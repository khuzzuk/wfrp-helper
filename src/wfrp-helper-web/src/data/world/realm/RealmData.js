import Nation from "../nation/Nation";
import Language from "../language/Language";
import Religion from "../religion/Religion";
import Currency from "../money/Currency";
import Person from "../../creature/Person";
import ModelElement from "../../../crud/ModelElement";

export default class RealmData extends ModelElement {
    nations: Nation[] = [];
    languages: Language[] = [];
    religions: Religion[] = [];
    currencies: Currency[] = [];
    persons: Person[] = [];


    updateWith(entity: RealmData) {
        this.updateEntityList(entity, 'nations', () => new Nation());
        this.updateEntityList(entity, 'languages', () => new Language());
        this.updateEntityList(entity, 'religions', () => new Religion());
        this.updateEntityList(entity, 'currencies', () => new Currency());
        this.updateEntityList(entity, 'persons', () => new Person());
    }
}