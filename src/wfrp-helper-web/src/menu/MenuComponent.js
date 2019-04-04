import React, {Component} from "react";
import {Button, Menu} from "@material-ui/core";

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

    render() {
        return <div>
            <Button id={'menu-world-button'}
                    onClick={this.handleClick}>
                {this.title}
            </Button>
            <Menu id={'menu-nation-item'}
                  anchorEl={this.state.anchorEl}
                  open={this.state.anchorEl !== null}
                  onClose={this.handleClose}>
                {this.getMenuItems()}
            </Menu>
        </div>
    }
}

export default MenuComponent;