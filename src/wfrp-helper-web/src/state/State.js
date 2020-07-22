import Entity from "../model/Entity";

export const State = {
    data: {
        showTable: null,
        showForm: null,
        afterForm: null,
        fetching: new Set(),
        user: {
            username: null,
            password: null,
            token: null
        }
    },
    services: {},
    formFields: {},
    columns: {},
    suppliers: {},
    onUpdate: data => {},
    update(data: any) {
        this.data = {...this.data, ...data};
        this.onUpdate(this.data);
    },
    updateUser(user: any) {
        this.data.user = {...this.data.user, ...user};
        this.onUpdate(this.data);
    },
    showTable(name: string) {
        this.update({entity: null, showForm: null, showTable: name, showScenario: false})
    },
    showForm(name: string, entity: Entity) {
        this.update({entity: entity, showForm: name, showTable: null, showScenario: false})
    },
    updateScenario(scenario: Entity) {
        this.update({entity: scenario, showForm: null, showTable: null, showScenario: true})
    },
    updateEntity(updates: any) {
        this.data.entity.updateWith(updates);
        this.update({entity: this.data.entity});
    },
    fetching(entityName: string) {
        this.data.fetching.add(entityName);
        this.update({fetching: this.data.fetching});
    },
    fetchingFinished(entityName: string) {
        this.data.fetching.delete(entityName);
        this.update({fetching: this.data.fetching});
    }
};
