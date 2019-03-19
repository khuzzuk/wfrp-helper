import {Component} from "react";
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import React from "react";
import MoreVertIcon from '@material-ui/icons/MoreVert'

class AppToolsMenu extends Component {
    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleClose = () => {
        this.setState({anchorEl: null})
    };

    render() {
        return <div>
            <IconButton aria-label={'More'}
                        aria-owns={this.state.anchorEl !== null ? 'app-tools-menu' : undefined}
                        aria-haspopup={'true'}
                        onClick={this.handleClick}>
                <MoreVertIcon/>
            </IconButton>

            <Menu id={'app-tools-menu'}
                  anchorEl={this.state.anchorEl}
                  open={this.state.anchorEl !== null}
                  onClose={this.handleClose}>
                <MenuItem onClick={this.handleClose}>Users</MenuItem>
            </Menu>

        </div>
    }
}

export default AppToolsMenu;