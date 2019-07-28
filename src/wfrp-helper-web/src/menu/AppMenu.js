import React, {Component} from 'react';
import {AppBar, Toolbar} from "@material-ui/core";
import AppToolsMenu from "./AppToolsMenu";
import CrudWorldMenu from "../data/world/CrudWorldMenu";
import CrudComponent from "../crud/CrudComponent";
import KnowledgeMenu from "../data/knowledge/KnowledgeMenu";
import CraftingMenu from "../data/crafting/CraftingMenu";
import LookMenu from "../data/look/LookMenu";
import CreatureMenu from "../data/creature/CreatureMenu";
import PersonService from "../data/creature/PersonService";
import CharacterSheetForm from "../characterSheet/CharacterSheetForm";
import EntitySelect from "../crud/field/EntitySelect";
import RealmService from "../data/world/realm/RealmService";
import withStyles from "@material-ui/core/styles/withStyles";
import {store} from "../state";
import {bus} from "../state/Bus";
import Message, {MessageType} from "../state/Message";

const style = {
    realmSelect: {
        marginLeft: 'auto',
        minWidth: 300,
        maxWidth: 300,
    },
};

class AppMenu extends Component {
    state = {
        showEditor: false,
        data: [],
        entity: null,
        currentService: null,
        customEditor: null
    };

    updateData = (data) => {
        this.setState({data: data, customEditor: null})
    };

    personEditor = (entity) => <CharacterSheetForm entity={entity} onChange={this.onApply} personService={this.personService}/>;
    personService = new PersonService(data => {this.setState({data: data, customEditor: this.personEditor})});

    realmService = new RealmService(this.updateData);

    constructor(props: P, context: any) {
        super(props, context);
        this.realmService.addDataListener(data => this.setState({realms: data}));
        this.realmService.retrieveData();
    }

    onApply = (newState) => {
        this.setState({...newState});
    };

    getCrud = service => {
        this.setState({
            showEditor: false,
            currentService: service,
            customEditor: null
        });
    };

    onPerson = () => {
        this.setState({showEditor: false, currentService: store.personService, customEditor: this.personEditor})
    };

    onRealm = realm => {
        bus.send(new Message(MessageType.CURRENT, 'realm', realm));
        this.setState({realm: realm})
    };

    render() {
        return (
            <div>
                <AppBar position={"relative"}>
                    <Toolbar>
                        <AppToolsMenu/>
                        <CrudWorldMenu onCrud={this.getCrud} store={store}/>
                        <CraftingMenu onCrud={this.getCrud}/>
                        <KnowledgeMenu onCrud={this.getCrud}/>
                        <LookMenu onCrud={this.getCrud}/>
                        <CreatureMenu onCrud={this.getCrud} onPerson={this.onPerson}/>
                        <EntitySelect className={this.props.classes.realmSelect}
                                      data={this.state.realms}
                                      value={this.state.realm}
                                      onChange={this.onRealm}/>
                    </Toolbar>
                </AppBar>
                {this.state.currentService
                    ?
                    <CrudComponent entity={this.state.currentService.entity}
                                   service={this.state.currentService}
                                   onChange={this.onApply}
                                   customEditor={this.state.customEditor || null}
                                   showEditor={this.state.showEditor}/>
                    : null}
            </div>
        )
    }
}

export default withStyles(style)(AppMenu);