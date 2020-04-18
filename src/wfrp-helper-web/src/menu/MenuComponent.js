import React, {Component} from "react";
import {Button, Menu} from "@material-ui/core";
import {withTranslation} from "react-i18next";
import MenuItem from "@material-ui/core/MenuItem";
import {State} from "../state/State";

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

    handleItemClick = entityName => () => {
        this.handleClose();
        State.showTable(entityName);
    };

    render() {
        const {t, name, entities} = this.props;
        return <div>
            <Button id={name}
                    onClick={this.handleClick}>
                {t(name)}
            </Button>
            <Menu id={name}
                  anchorEl={this.state.anchorEl}
                  open={this.state.anchorEl !== null}
                  onClose={this.handleClose}>
                {
                    entities.map(entityName =>
                        <MenuItem key={entityName} onClick={this.handleItemClick(entityName)}>
                            {t(entityName)}
                        </MenuItem>)
                }
            </Menu>
        </div>
    }
}

export default withTranslation()(MenuComponent);