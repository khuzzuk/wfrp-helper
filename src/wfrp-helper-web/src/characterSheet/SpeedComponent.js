// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {DeterminantType} from "../data/rule/Determinant";

const componentStyle = {
    container: {
        height: 200,
        width: 200,
        paddingLeft: 165,
        paddingTop: 80,
        display: 'flex',
        flexFlow: 'column',
    },

    firstRow: {
        display: 'flex',
        height: 45,
        width: '100%',
    },
    nextRow: {
        display: 'flex',
        height: 45,
        width: '100%',
    },
    cell: {
        width: 70,
        textAlign: 'center',
        alignSelf: 'center',
    },
};

class SpeedComponent extends Component {
    calc = (speed, tempo) => [speed * tempo, speed * tempo * 6, speed * tempo * 360 / 1000];
    calculateSpeed = speed => [this.calc(speed, 2), this.calc(speed, 4), this.calc(speed, 16)];

    render() {
        const {
            customStyle, classes,
            entity,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};
        const speed = this.calculateSpeed(entity.determinants.findDeterminant(DeterminantType.SPEED).calculateExperienceValue());

        return (
            <div {...other} className={currentStyle.container}>
                <div className={currentStyle.firstRow}>
                    <div className={currentStyle.cell}>{speed[0][0]}</div>
                    <div className={currentStyle.cell}>{speed[0][1]}</div>
                    <div className={currentStyle.cell}>{speed[0][2]}</div>
                </div>
                <div className={currentStyle.nextRow}>
                    <div className={currentStyle.cell}>{speed[1][0]}</div>
                    <div className={currentStyle.cell}>{speed[1][1]}</div>
                    <div className={currentStyle.cell}>{speed[1][2]}</div>
                </div>
                <div className={currentStyle.nextRow}>
                    <div className={currentStyle.cell}>{speed[2][0]}</div>
                    <div className={currentStyle.cell}>{speed[2][1]}</div>
                    <div className={currentStyle.cell}>{speed[2][2]}</div>
                </div>
            </div>
        );
    };
};

export default withStyles(componentStyle)(SpeedComponent);