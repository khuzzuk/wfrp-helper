import React, {Component} from 'react';
import {
    AppBar,
    Toolbar
} from "@material-ui/core";
import AppToolsMenu from "./AppToolsMenu";
import CrudWorldMenu from "./CrudWorldMenu";
import CrudComponent from "../crud/CrudComponent";

class AppMenu extends Component {
    state = {
        open: false,
        columns: [],
        rows: []
    };

    handleToggle = () => {
        this.setState({open: !this.state.open})
    };

    handleClose = event => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({open: false});
        }
    };

    handleData = (columns, rows) => {
        this.setState({columns: columns, rows: rows})
    };

    render() {
        //const columns = ['asd', 'bsd'];
        //const rows = [{asd: '1', bsd:'2'}, {asd:'2', bsd:'3'}];

        return (
            <div>
                <AppBar position={"relative"}>
                    <Toolbar>
                        <AppToolsMenu/>
                        <CrudWorldMenu dataReceiver={this.handleData}/>
                    </Toolbar>
                </AppBar>
                <CrudComponent columns={this.state.columns} rows={this.state.rows}/>
            </div>
        )
    }
}

export default AppMenu;