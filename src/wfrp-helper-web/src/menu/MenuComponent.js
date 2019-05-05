import React, {Component} from "react";
import {Button, Menu} from "@material-ui/core";
import ConnectionService from "../connection/ConnectionService";

class MenuComponent extends Component {
    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleClose = () => {
        this.setState({anchorEl: null})
    };

    showCrudAction = (action, service: ConnectionService) => () => {
        this.handleClose();
        this.props.onClick && this.props.onClick();
        action();
        service.retrieveData();
    };

    render() {
        return <div>
            <Button id={'menu-button'}
                    onClick={this.handleClick}>
                {this.title}
            </Button>
            <Menu id={'menu-item'}
                  anchorEl={this.state.anchorEl}
                  open={this.state.anchorEl !== null}
                  onClose={this.handleClose}>
                {this.getMenuItems()}
            </Menu>
        </div>
    }
}

export default MenuComponent;