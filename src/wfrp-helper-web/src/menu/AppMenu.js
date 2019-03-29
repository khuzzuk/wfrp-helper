import React, {Component} from 'react';
import {AppBar, Toolbar} from "@material-ui/core";
import AppToolsMenu from "./AppToolsMenu";
import CrudWorldMenu from "../world/CrudWorldMenu";
import NationService from "../world/nation/NationService";
import CrudComponent from "../crud/CrudComponent";
import LanguageService from "../world/language/LanguageService";

class AppMenu extends Component {
    state = {
        open: false,
        data: [],
        panelSupplier: () => {
        }
    };

    nationService = new NationService((data) => this.updateData(data));
    languageService = new LanguageService((data) => this.updateData(data));

    updateData = (data) => {
        this.setState({data: data})
    };

    handleClose = event => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({open: false});
        }
    };

    getCrud = (service) => () => {
        this.setState({
            panelSupplier: () => {
                return <CrudComponent rows={this.state.data} service={service} onChange={this.setState}/>
            }
        });

    };

    render() {
        let panel = this.state.panelSupplier();
        return (
            <div>
                <AppBar position={"relative"}>
                    <Toolbar>
                        <AppToolsMenu/>
                        <CrudWorldMenu nationService={this.nationService}
                                       onNation={this.getCrud(this.nationService)}
                                       languageService={this.languageService}
                                       onLanguage={this.getCrud(this.languageService)}/>
                    </Toolbar>
                </AppBar>
                {panel}
            </div>
        )
    }
}

export default AppMenu;