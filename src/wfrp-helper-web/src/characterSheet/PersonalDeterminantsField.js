import React, {Component} from "react";
import PersonDeterminants from "../data/creature/PersonDeterminants";
import IntegerField from "../crud/field/IntegerField";
import {withStyles} from "@material-ui/styles";
import {DeterminantType} from "../data/rule/Determinant";
import ProfessionExtensionField from "./ProfessionExtensionField";

const PersonalDeterminantFieldStyle = {
    row1: {
        maxHeight: '45px',
        minHeight: '45px',
        width: '100%',
        display: 'flex',
    },
    row2: {
        maxHeight: '50px',
        minHeight: '50px',
        width: '100%',
        display: 'flex',
    },
    row3: {
        maxHeight: '30px',
        minHeight: '30px',
        width: '100%',
        display: 'flex',
        textAlign: 'center',
    },
    input: {
        fontFamily: 'wfrp',
        fontSize: '24px',
        textAlign: 'center'
    },

    firstInRow: {
        minHeight: '50px',
        maxHeight: '50px',
        minWidth: '47px',
        maxWidth: '47px',
    },
    otherInRow: {
        maxHeight: '50px',
        minHeight: '50px',
        minWidth: '47px',
        maxWidth: '47px',
    },
    otherInRow2: {
        maxHeight: '50px',
        minHeight: '50px',
        minWidth: '46px',
        maxWidth: '46px',
    },
    lastRowChild: {
        margin: '15px 0 0 0',
    }
};

class PersonalDeterminantsField extends Component {
    updateDeterminant = determinant => value => {
        determinant.value = value;
        this.props.onChange(this.props.person.determinants);
    };

    updateDeterminantExperience = determinant => {
        const determinants: PersonDeterminants = this.props.person.determinants;
        determinants.replaceDeterminant(determinant);
        this.props.onChange(determinants);
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

        return <div {...other}>
            <div className={classes.row1}>
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
            <div className={classes.row2}>
                <ProfessionExtensionField ext={speed} customClassName={classes.firstInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={battle} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={shooting} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={strength} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={durability} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={health} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={attack} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={initiative} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={dexterity} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={leaderSkills} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={intelligence} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={control} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={will} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={charisma} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
            </div>
            <div className={classes.row3}>
                <p className={`${classes.lastRowChild} ${classes.firstInRow} `}>{speed.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{battle.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{shooting.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{strength.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{durability.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{health.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{attack.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{initiative.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{dexterity.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{leaderSkills.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{intelligence.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{control.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{will.calculateFinalValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{charisma.calculateFinalValue()}</p>
            </div>
        </div>;
    }
}

export default withStyles(PersonalDeterminantFieldStyle)(PersonalDeterminantsField);