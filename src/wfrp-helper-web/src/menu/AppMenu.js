import React, {Component} from 'react';
import {AppBar, Toolbar} from "@material-ui/core";
import AppToolsMenu from "./AppToolsMenu";
import CrudWorldMenu from "../world/nation/CrudWorldMenu";
import type EntityEditor from "../crud/EntityEditor";
import NationCrud from "../world/nation/NationCrud";
import NationService from "../world/nation/NationService";

class AppMenu extends Component {
    state = {
        open: false,
        data: [],
        editor: () => {}
    };

    nationService = new NationService((data) => this.updateData(data));

    updateData = (data) => {
        this.setState({data: data})
    };

    handleToggle = () => {
        this.setState({open: !this.state.open})
    };

    handleClose = event => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({open: false});
        }
    };

    handleData = (columns, rows, editor: EntityEditor) => {
        this.setState({columns: columns, rows: rows, editor: editor})
    };

    getNationCrud = () => {
        return <NationCrud rows={this.state.data} editor={this.nationService} onChange={this.setState}/>
    };

    render() {
        let panel = this.state.editor();
        return (
            <div>
                <AppBar position={"relative"}>
                    <Toolbar>
                        <AppToolsMenu/>
                        <CrudWorldMenu nationService={this.nationService}
                                       onNation={() => this.setState({editor: this.getNationCrud})}/>
                    </Toolbar>
                </AppBar>
                {panel}
            </div>
        )
    }
}

export default AppMenu;