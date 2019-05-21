import React, {Component} from "react";
import PersonDeterminants from "../data/creature/PersonDeterminants";
import IntegerField from "../crud/field/IntegerField";
import {withStyles} from "@material-ui/styles";
import {DeterminantType} from "../data/rule/Determinant";
import ProfessionExtensionField from "./ProfessionExtensionField";
import Determinant from "../data/rule/Determinant";

const PersonalDeterminantFieldStyle = {
    row: {
        maxHeight: '60px',
        minHeight: '60px',
        width: '100%',
    },
    input: {
        fontFamily: 'wfrp',
        fontSize: '24px',
        textAlign: 'center'
    },

    firstInRow: {
        minHeight: '30px',
        maxHeight: '30px',
        minWidth: '47px',
        maxWidth: '47px',
    },
    otherInRow: {
        maxHeight: '30px',
        minHeight: '30px',
        minWidth: '47px',
        maxWidth: '47px',
    },
    otherInRow2: {
        maxHeight: '30px',
        minHeight: '30px',
        minWidth: '46px',
        maxWidth: '46px',
    }
};

class PersonalDeterminantsField extends Component {
    updateDeterminant = determinant => value => {
        determinant.value = value;
        this.props.onChange(this.props.person.determinants);
    };

    render() {
        const {person, classes, ...other} = this.props;
        const determinants: PersonDeterminants = person.determinants;
        const speed = determinants.findDeterminant(DeterminantType.SPEED);
        const battle = determinants.findDeterminant(DeterminantType.BATTLE);
        const shooting = determinants.findDeterminant(DeterminantType.SHOOTING);
        const strength = determinants.findDeterminant(DeterminantType.STRENGTH);
        const durability = determinants.findDeterminant(DeterminantType.DURABILITY);
        const health = determinants.findDeterminant(DeterminantType.HEALTH);
        const attack = determinants.findDeterminant(DeterminantType.ATTACK);
        const initiative = determinants.findDeterminant(DeterminantType.INITIATIVE);
        const dexterity = determinants.findDeterminant(DeterminantType.DEXTERITY);
        const leaderSkills = determinants.findDeterminant(DeterminantType.LEADER_SKILLS);
        const intelligence = determinants.findDeterminant(DeterminantType.INTELLIGENCE);
        const control = determinants.findDeterminant(DeterminantType.CONTROL);
        const will = determinants.findDeterminant(DeterminantType.WILL);
        const charisma = determinants.findDeterminant(DeterminantType.CHARISMA);
        const profession = person.currentProfession;
        const professionSpeed: Determinant = PersonDeterminants.findDeterminantIn(profession.determinants, DeterminantType.SPEED);

        return <div {...other}>
            <div className={classes.row}>
                <IntegerField className={classes.firstInRow}  value={speed.value} onChange={this.updateDeterminant(speed)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow}  value={battle.value} onChange={this.updateDeterminant(battle)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow}  value={shooting.value} onChange={this.updateDeterminant(shooting)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow}  value={strength.value} onChange={this.updateDeterminant(strength)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow}  value={durability.value} onChange={this.updateDeterminant(durability)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow2} value={health.value} onChange={this.updateDeterminant(health)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow2} value={attack.value} onChange={this.updateDeterminant(attack)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow}  value={initiative.value} onChange={this.updateDeterminant(initiative)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow2} value={dexterity.value} onChange={this.updateDeterminant(dexterity)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow2} value={leaderSkills.value} onChange={this.updateDeterminant(leaderSkills)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow2} value={intelligence.value} onChange={this.updateDeterminant(intelligence)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow2} value={control.value} onChange={this.updateDeterminant(control)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow2} value={will.value} onChange={this.updateDeterminant(will)} inputProps={{className: classes.input}} />
                <IntegerField className={classes.otherInRow}  value={charisma.value} onChange={this.updateDeterminant(charisma)} inputProps={{className: classes.input}} />
            </div>
            <div className={classes.row}>
                <ProfessionExtensionField ext={professionSpeed} customClassName={classes.firstInRow}/>
            </div>
        </div>;
    }
}

export default withStyles(PersonalDeterminantFieldStyle)(PersonalDeterminantsField);