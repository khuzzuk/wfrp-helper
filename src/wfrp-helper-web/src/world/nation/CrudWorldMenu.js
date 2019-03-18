import {Component} from "react";
import React from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import ConnectionService from "../../connection/ConnectionService";
import NationService from "./NationService";

class CrudWorldMenu extends Component {
    state = {
        anchorEl: null
    };
    nationService;
    columns = [{
        header: 'Name',
        field: 'name'
    }, {
        header: 'Description',
        field: 'description'
    }];
    dataReceiver;

    constructor(props, context) {
        super(props, context);
        this.dataReceiver = this.props.dataReceiver;
        this.nationService = new NationService(this.crudAction)
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleClose = () => {
        this.setState({anchorEl: null})
    };

    showNationCrud = () => {
        this.handleClose();
        this.nationService.retrieveData(this.crudAction);
    };

    crudAction = (data: Array) => {
        this.dataReceiver(this.columns, data);
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