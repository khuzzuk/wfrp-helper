// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import SelectableList from "./field/SelectableList";

const componentStyle = {
    container: {
        minWidth: 800,
        maxWidth: 800,
        minHeight: 300,
        maxHeight: 300,
    },
    animalList: {
        minWidth: 620,
        maxWidth: 620,
        minHeight: 280,
        maxHeight: 280,
    },
};

class AnimalsSection extends Component {
    render() {
        const {
            customStyle, classes,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};

        return (
            <div {...other} className={currentStyle.container}>
                <SelectableList customStyle={{container: currentStyle.spellList}}>
                    {}
                </SelectableList>
            </div>
        );
    };
};

export default withStyles(componentStyle)(AnimalsSection);