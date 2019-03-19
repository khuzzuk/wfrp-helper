import React, {Component} from 'react';
import {
    AppBar,
    Toolbar
} from "@material-ui/core";
import AppToolsMenu from "./AppToolsMenu";
import CrudWorldMenu from "../world/nation/CrudWorldMenu";
import CrudComponent from "../crud/CrudComponent";
import NationEditor from "../world/nation/NationEditor";
import type EntityEditor from "../crud/EntityEditor";

class AppMenu extends Component {
    state = {
        open: false,
        columns: [],
        rows: [],
        editor: null
    };

    nationEditor = new NationEditor();

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

    render() {
        return (
            <div>
                <AppBar position={"relative"}>
                    <Toolbar>
                        <AppToolsMenu/>
                        <CrudWorldMenu dataReceiver={(columns, rows) => this.handleData(columns, rows, this.nationEditor)}
                                       editor={this.nationEditor}/>
                    </Toolbar>
                </AppBar>
                <CrudComponent columns={this.state.columns} rows={this.state.rows} editor={this.state.editor}/>
            </div>
        )
    }
}

export default AppMenu;