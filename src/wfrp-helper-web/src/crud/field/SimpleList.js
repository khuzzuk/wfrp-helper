import React, {Component} from "react";
import {Menu, MenuItem} from "@material-ui/core";

export default class SimpleList extends Component {
    state = {
        anchorEl: null,
        currentElement: null
    };

    handleClick = element => event => {
        this.setState({anchorEl: event.currentTarget, currentElement: element})
    };

    onRemove = element => () => {
        this.handleClose();
        this.props.onRemove(element);
    };

    handleClose = () => {
        this.setState({anchorEl: null, currentElement: null})
    };

    render() {
        const {data, ...other} = this.props;
        return <div {...other}>
            {data.map((element, index) =>
                <div key={'listed-entity-' + element.name}>
                    <p onClick={this.handleClick(element)}>{(index > 0 ? ', ' : '') + element.name}</p>
                    <Menu id={'listed-menu-item-' + element.name}
                          anchorEl={this.state.anchorEl}
                          open={element === this.state.currentElement && this.state.anchorEl !== null}
                          onClose={this.handleClose}>
                        {
                            <MenuItem onClick={this.onRemove(element)}>Remove</MenuItem>
                        }
                    </Menu>
                </div>
            )}
        </div>;
    }
}