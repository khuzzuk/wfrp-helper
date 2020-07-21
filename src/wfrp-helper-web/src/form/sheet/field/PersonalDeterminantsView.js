import {withStyles} from "@material-ui/styles";
import React, {Component} from "react";
import CreatureDeterminants from "../../../model/creature/CreatureDeterminants";
import {DeterminantType} from "../../../model/rule/Determinant";
import {State} from "../../../state/State";
import {PersonalDeterminantFieldStyle} from "./PersonalDeterminantsField";
import ProfessionExtensionView from "./ProfessionExtensionView";

class PersonalDeterminantsField extends Component {
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
            <div className={classes.row1} style={{paddingLeft: 15}}>
                <div className={classes.firstInRow}>{speed.value}</div>
                <div className={classes.otherInRow}>{battle.value}</div>
                <div className={classes.otherInRow}>{shooting.value}</div>
                <div className={classes.otherInRow}>{strength.value}</div>
                <div className={classes.otherInRow}>{durability.value}</div>
                <div className={classes.otherInRow2}>{health.value}</div>
                <div className={classes.otherInRow}>{initiative.value}</div>
                <div className={classes.otherInRow2}>{attack.value}</div>
                <div className={classes.otherInRow2}>{dexterity.value}</div>
                <div className={classes.otherInRow2}>{leaderSkills.value}</div>
                <div className={classes.otherInRow2}>{intelligence.value}</div>
                <div className={classes.otherInRow2}>{control.value}</div>
                <div className={classes.otherInRow2}>{will.value}</div>
                <div className={classes.otherInRow}>{charisma.value}</div>
            </div>
            <div className={classes.row2}>
                <ProfessionExtensionView ext={speed} customClassName={classes.firstInRow}/>
                <ProfessionExtensionView ext={battle} customClassName={classes.otherInRow}/>
                <ProfessionExtensionView ext={shooting} customClassName={classes.otherInRow}/>
                <ProfessionExtensionView ext={strength} customClassName={classes.otherInRow}/>
                <ProfessionExtensionView ext={durability} customClassName={classes.otherInRow}/>
                <ProfessionExtensionView ext={health} customClassName={classes.otherInRow2}/>
                <ProfessionExtensionView ext={initiative} customClassName={classes.otherInRow}/>
                <ProfessionExtensionView ext={attack} customClassName={classes.otherInRow2}/>
                <ProfessionExtensionView ext={dexterity} customClassName={classes.otherInRow2}/>
                <ProfessionExtensionView ext={leaderSkills} customClassName={classes.otherInRow2}/>
                <ProfessionExtensionView ext={intelligence} customClassName={classes.otherInRow2}/>
                <ProfessionExtensionView ext={control} customClassName={classes.otherInRow2}/>
                <ProfessionExtensionView ext={will} customClassName={classes.otherInRow2}/>
                <ProfessionExtensionView ext={charisma} customClassName={classes.otherInRow}/>
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