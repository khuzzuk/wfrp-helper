import React, {Component} from "react";
import {FormLabel, Menu, MenuItem} from "@material-ui/core";

export default class SimpleList extends Component {
    state = {
        anchorEl: null,
        currentElement: null
    };

    handleClick = element => event => {
        this.setState({anchorEl: event.currentTarget, currentElement: element})
    };

    handleClose = () => {
        this.setState({anchorEl: null, currentElement: null})
    };

    render() {
        const {data, onRemove, ...other} = this.props;
        return <div {...other}>
            {data.map((element, index) => {
                return <div key={'listed-entity-' + element.name}>
                    <FormLabel onClick={this.handleClick(element)}>{(index > 0 ? ', ' : '') + element.name}</FormLabel>
                    <Menu id={'listed-menu-item-' + element.name}
                          anchorEl={this.state.anchorEl}
                          open={element === this.state.currentElement && this.state.anchorEl !== null}
                          onClose={this.handleClose}>
                        {
                            <MenuItem onClick={() => onRemove(element)}>Remove</MenuItem>
                        }
                    </Menu>
                </div>
            })}
        </div>;
    }
}