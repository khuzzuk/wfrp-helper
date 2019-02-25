import {Component} from "react";
import React from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";

class CrudWorldMenu extends Component {
    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleClose = () => {
        this.setState({anchorEl: null})
    };

    showNationCrud = () => {
        this.handleClose();
    };

    render() {
        return <div>
            <Button id={'menu-world-button'}
                    onClick={this.handleClick}>
                World
            </Button>

            <Menu id={'menu-nation-item'}
                  anchorEl={this.state.anchorEl}
                  open={this.state.anchorEl !== null}
                  onClose={this.handleClose}>
                <MenuItem onClick={this.showNationCrud}>
                    Nations
                </MenuItem>
            </Menu>
        </div>
    }
}

export default CrudWorldMenu;