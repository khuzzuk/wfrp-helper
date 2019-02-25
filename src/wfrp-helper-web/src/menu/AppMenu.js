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
    };

    handleToggle = () => {
        this.setState({open: !this.state.open})
    };

    handleClose = event => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({open: false});
        }
    };

    render() {
        const {classes} = this.props;
        const columns = ['asd', 'bsd'];
        const rows = [{asd: '1', bsd:'2'}, {asd:'2', bsd:'3'}];

        return (
            <div>
                <AppBar position={"relative"}>
                    <Toolbar>
                        <AppToolsMenu/>
                        <CrudWorldMenu/>
                    </Toolbar>
                </AppBar>
                <CrudComponent columns={columns} rows={rows}/>
            </div>
        )
    }
}

export default AppMenu;