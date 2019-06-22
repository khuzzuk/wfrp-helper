// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import ItemSection from "./ItemSection";
import MoneySubsection from "./MoneySubsection";
import SpeedComponent from "./SpeedComponent";

const componentStyle = {
    container: {
        width: 900,
        minHeight: 700,
        maxHeight: 700,
        display: 'flex',
    },
    firstColumn: {
        minHeight: 700,
        maxHeight: 700,
        minWidth: 300,
        maxWidth: 300,
    },
    secondColumn: {
        minHeight: 700,
        maxHeight: 700,
        minWidth: 370,
        maxWidth: 370,
    },
    thirdColumn: {
        minHeight: 700,
        maxHeight: 700,
        minWidth: 220,
        maxWidth: 220,
    },
};

class SecondMiddleSection extends Component {
    render() {
        const {
            customStyle, classes,
            onChange, personService,
            entity,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};

        return (
            <div {...other} className={currentStyle.container}>
                <div className={currentStyle.firstColumn}>
                    <ItemSection entity={entity} personService={personService} onChange={onChange}/>
                    <MoneySubsection entity={entity} personService={personService} onChange={onChange}/>
                </div>
                <div className={currentStyle.secondColumn}>
                    <SpeedComponent entity={entity}/>
                </div>
                <div className={currentStyle.thirdColumn}></div>
            </div>
        );
    };
};

export default withStyles(componentStyle)(SecondMiddleSection);