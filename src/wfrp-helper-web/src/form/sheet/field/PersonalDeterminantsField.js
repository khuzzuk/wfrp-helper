import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import CreatureDeterminants from "../../../model/creature/CreatureDeterminants";
import {DeterminantType} from "../../../model/rule/Determinant";
import {State} from "../../../state/State";
import ProfessionExtensionField from "./ProfessionExtensionField";
import SimpleTextField, {TextFieldType} from "./SimpleTextField";

const PersonalDeterminantFieldStyle = {
    row1: {
        paddingTop: 10,
        maxHeight: 35,
        minHeight: 35,
        width: '100%',
        display: 'flex',
    },
    row2: {
        maxHeight: 50,
        minHeight: 50,
        width: '100%',
        display: 'flex',
    },
    row3: {
        maxHeight: 50,
        minHeight: 50,
        width: '100%',
        display: 'flex',
        textAlign: 'center',
    },

    firstInRow: {
        minHeight: 50,
        maxHeight: 50,
        minWidth: 47,
        maxWidth: 47,
    },
    otherInRow: {
        maxHeight: 50,
        minHeight: 50,
        minWidth: 47,
        maxWidth: 47,
    },
    otherInRow2: {
        maxHeight: 50,
        minHeight: 50,
        minWidth: 46,
        maxWidth: 46,
    },
    lastRowChild: {
        margin: '15px 0 0 0',
    }
};

class PersonalDeterminantsField extends Component {
    updateDeterminant = determinant => value => {
        determinant.value = value;
        State.updateEntity({determinants: State.data.entity.determinants});
    };

    updateDeterminantExperience = determinant => {
        const determinants: CreatureDeterminants = State.data.entity.determinants;
        determinants.replaceDeterminant(determinant);
        State.updateEntity({determinants: determinants});
    };

    render() {
        const {classes, ...other} = this.props;
        const person = State.data.entity;
        const determinants: CreatureDeterminants = person.determinants;
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
                <SimpleTextField className={classes.firstInRow}  value={speed.value} onChange={this.updateDeterminant(speed)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow}  value={battle.value} onChange={this.updateDeterminant(battle)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow}  value={shooting.value} onChange={this.updateDeterminant(shooting)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow}  value={strength.value} onChange={this.updateDeterminant(strength)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow}  value={durability.value} onChange={this.updateDeterminant(durability)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow2} value={health.value} onChange={this.updateDeterminant(health)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow}  value={initiative.value} onChange={this.updateDeterminant(initiative)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow2} value={attack.value} onChange={this.updateDeterminant(attack)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow2} value={dexterity.value} onChange={this.updateDeterminant(dexterity)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow2} value={leaderSkills.value} onChange={this.updateDeterminant(leaderSkills)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow2} value={intelligence.value} onChange={this.updateDeterminant(intelligence)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow2} value={control.value} onChange={this.updateDeterminant(control)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow2} value={will.value} onChange={this.updateDeterminant(will)} variant={TextFieldType.INT} />
                <SimpleTextField className={classes.otherInRow}  value={charisma.value} onChange={this.updateDeterminant(charisma)} variant={TextFieldType.INT} />
            </div>
            <div className={classes.row2}>
                <ProfessionExtensionField ext={speed} customClassName={classes.firstInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={battle} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={shooting} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={strength} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={durability} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={health} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={initiative} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={attack} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={dexterity} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={leaderSkills} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={intelligence} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={control} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={will} customClassName={classes.otherInRow2} onChange={this.updateDeterminantExperience}/>
                <ProfessionExtensionField ext={charisma} customClassName={classes.otherInRow} onChange={this.updateDeterminantExperience}/>
            </div>
            <div className={classes.row3}>
                <p className={`${classes.lastRowChild} ${classes.firstInRow} `}>{speed.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{battle.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{shooting.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{strength.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{durability.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{health.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{initiative.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{attack.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{dexterity.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{leaderSkills.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{intelligence.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{control.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow2}`}>{will.calculateExperienceValue()}</p>
                <p className={`${classes.lastRowChild} ${classes.otherInRow} `}>{charisma.calculateExperienceValue()}</p>
            </div>
        </div>;
    }
}

export default withStyles(PersonalDeterminantFieldStyle)(PersonalDeterminantsField);