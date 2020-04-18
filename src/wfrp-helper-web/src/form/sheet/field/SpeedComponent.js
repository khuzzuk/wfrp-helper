// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {DeterminantType} from "../../../model/rule/Determinant";
import {State} from "../../../state/State";

const componentStyle = {
    container: {
        height: 160,
        width: 200,
        paddingLeft: 140,
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
        const {classes, entity = State.data.entity} = this.props;
        const speed = this.calculateSpeed(entity.determinants.findDeterminant(DeterminantType.SPEED).calculateExperienceValue());

        return (
            <div className={classes.container}>
                <div className={classes.firstRow}>
                    <div className={classes.cell}>{speed[0][0]}</div>
                    <div className={classes.cell}>{speed[0][1]}</div>
                    <div className={classes.cell}>{speed[0][2]}</div>
                </div>
                <div className={classes.nextRow}>
                    <div className={classes.cell}>{speed[1][0]}</div>
                    <div className={classes.cell}>{speed[1][1]}</div>
                    <div className={classes.cell}>{speed[1][2]}</div>
                </div>
                <div className={classes.nextRow}>
                    <div className={classes.cell}>{speed[2][0]}</div>
                    <div className={classes.cell}>{speed[2][1]}</div>
                    <div className={classes.cell}>{speed[2][2]}</div>
                </div>
            </div>
        );
    };
}

export default withStyles(componentStyle)(SpeedComponent);