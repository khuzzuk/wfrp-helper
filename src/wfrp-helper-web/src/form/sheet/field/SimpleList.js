import Tooltip from "@material-ui/core/Tooltip";
import React, {Component} from "react";
import {Menu, MenuItem} from "@material-ui/core";
import {State} from "../../../state/State";

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
        const {name, data = State.data.entity[name], onRemove, ...other} = this.props;
        return <div {...other}>
            {data.map((element, index) => {
                    const value = element.name || element;
                    return <div key={'listed-entity-' + value} style={{display: 'inline-block'}}>
                        {
                            element.name ?
                                element.description ?
                                    <Tooltip title={element.description}><p onClick={this.handleClick(element)} style={{margin: 0}}>{(index > 0 ? ', ' : '') + value}</p></Tooltip> :
                                    <p onClick={this.handleClick(element)} style={{margin: 0}}>{(index > 0 ? ', ' : '') + value}</p> :
                                <p style={{margin: 0}}>{(index > 0 ? ', ' : '') + value}</p>
                        }
                        {
                            element.name
                            && <Menu id={'listed-menu-item-' + element.name}
                                     anchorEl={this.state.anchorEl}
                                     open={element === this.state.currentElement && this.state.anchorEl !== null}
                                     onClose={this.handleClose}>
                                {
                                    <MenuItem onClick={this.onRemove(element)}>Remove</MenuItem>
                                }
                            </Menu>
                        }
                    </div>
                }
            )}
        </div>;
    }
}