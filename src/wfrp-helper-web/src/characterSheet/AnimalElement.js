// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

const componentStyle = {
    container: {},
    name: {
        width: 150,
    },
};

class AnimalElement extends Component {
    render() {
        const {
            customStyle, classes,
            animal, onRemove,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};

        return (
            <div {...other} className={currentStyle.container} onContextMenu={event => {
                event.preventDefault();
                onRemove(animal);
            }}>
                <div>{animal.name}</div>
            </div>
        );
    };
};

export default withStyles(componentStyle)(AnimalElement);