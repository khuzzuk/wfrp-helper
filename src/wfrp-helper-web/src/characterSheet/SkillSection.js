import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GearComponent from "./GearComponent";
import Skill from "../data/knowledge/skill/Skill";
import ArmorCalculationsComponent from "./ArmorCalculationsComponent";
import CreatureArmorValues from "../data/creature/CreatureArmorValues";

const skillSectionStyle = {
    firstColumn: {
        minWidth: 200,
        maxWidth: 200,
    },
    skillFirstColumn: {
        minHeight: 350,
        maxHeight: 350,
    },
    skillElement: {
        margin: 0,
        marginLeft: 5,
    },
    skillsList: {
        height: 300,
        maxHeight: 300,
        paddingLeft: 10,
        paddingTop: 0,
        width: 200,
        overflow: 'auto',
    },
    armorCalculations: {
        height: 300
    },
};

class SkillSection extends Component {
    onSkillAdd = (skill: Skill) => {
        const skills = this.props.entity.skills;
        skills.push(skill);
        this.props.onChange(this.props.entity);
    };

    onSkillRemove = (event, skill: Skill) => {
        event.preventDefault();
        let skills = this.props.entity.skills;
        skills.splice(skills.indexOf(skill, 1));
        this.props.onChange(this.props.entity);
    };

    render() {
        const {
            classes, customStyle,
            entity, personService,
            ...other
        } = this.props;
        const currentStyle = {...classes, ...customStyle};
        const firstColumnSkills: Skill[] = entity.skills;
        const availableSkills = personService.skills.filter(skill =>
            !entity.skills.find(personSkill => personSkill.name === skill.name));

        return <div {...other}>
            <GearComponent customStyle={{gearField: currentStyle.skillFirstColumn, itemsList: currentStyle.skillsList}}
                           data={availableSkills} onGearAdd={this.onSkillAdd}>
                {
                    firstColumnSkills.map(skill =>
                        <p className={currentStyle.skillElement}
                           onContextMenu={event => this.onSkillRemove(event, skill)}>{skill.name}</p>)
                }
            </GearComponent>
            <ArmorCalculationsComponent className={currentStyle.armorCalculations} entity={entity}/>
        </div>;
    }
}

export default withStyles(skillSectionStyle)(SkillSection);