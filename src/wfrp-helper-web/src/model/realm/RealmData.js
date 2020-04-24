import Person from "../creature/Person";
import SpellSchool from "../knowledge/SpellSchool";
import ModelElement from "../ModelElement";
import Currency from "../world/Currency";
import Language from "../world/Language";
import Nation from "../world/Nation";
import Race from "../world/Race";
import Religion from "../world/Religion";

export default class RealmData extends ModelElement {
    nations: Nation[] = [];
    languages: Language[] = [];
    religions: Religion[] = [];
    currencies: Currency[] = [];
    races: Race[] = [];
    spellSchools: SpellSchool[] = [];
    persons: Person[] = [];


    updateWith(entity: RealmData): RealmData {
        this.updateEntityList(entity, 'nations', () => new Nation());
        this.updateEntityList(entity, 'languages', () => new Language());
        this.updateEntityList(entity, 'religions', () => new Religion());
        this.updateEntityList(entity, 'currencies', () => new Currency());
        this.updateEntityList(entity, 'races', () => new Race());
        this.updateEntityList(entity, 'spellSchools', () => new SpellSchool());
        this.updateEntityList(entity, 'persons', () => new Person());
        return this;
    }
}