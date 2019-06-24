import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Skill from "../data/knowledge/skill/Skill";
import ArmorCalculationsComponent from "./ArmorCalculationsComponent";
import SelectableList from "../crud/field/SelectableList";
import MagicService from "../data/knowledge/MagicService";
import CurrentMagicKnowledge from "../data/knowledge/CurrentMagicKnowledge";
import SpellSchoolLevel from "../data/knowledge/magic/spellSchool/SpellSchoolLevel";

const skillSectionStyle = {
    container: {
        maxWidth: 450,
        minWidth: 450,
        height: '100%',
        display: 'flex'
    },
    firstColumn: {
        minWidth: 200,
        maxWidth: 200,
        height: '100%'
    },
    secondColumn: {
        minWidth: 200,
        maxWidth: 200,
        height: '100%',
        marginLeft: 20,
    },
    skillFirstColumn: {
        paddingLeft: 10,
        minHeight: 350,
        maxHeight: 350,
        width: 200,
    },
    skillsList: {
        height: 300,
        width: '100%',
        overflow: 'auto',
    },

    skillSecondColumn: {
        minHeight: 450,
        maxHeight: 450,
    },
    skillElement: {
        margin: 0,
        marginLeft: 5,
    },
    skillsListSecondColumn: {
        height: 400,
        maxHeight: 400,
        paddingLeft: 10,
        paddingTop: 0,
        width: 200,
        overflow: 'auto',
    },
    armorCalculations: {
        height: 300
    },
    spellSchoolElement: {
        margin: 0,
        marginLeft: 5,
    },
};

const magicService = new MagicService();

class SkillSection extends Component {
    state = {
        availableSpellSchools: new Map(),
    };

    onSkillAdd = (skill: Skill) => {
        const skills = this.props.entity.skills;
        skills.push(skill);
        this.props.onChange(this.props.entity);
    };

    onSpellSchoolAdd = spellSchool => {
        const entity = this.props.entity;
        const currentSpellSchools = entity.spellSchools;
        const currentLevelIndex = currentSpellSchools.indexOf(currentSpellSchools.find(value => value.spellSchool.name === spellSchool.name));
        if (currentLevelIndex >= 0) {
            currentSpellSchools.splice(currentLevelIndex, 1);
        }
        entity.updateWith({spellSchools: [...currentSpellSchools, this.state.availableSpellSchools.get(spellSchool)]});
        this.props.onChange(this.props.entity);
    };

    onSpellSchoolRemove = (event, spellSchool) => {
        event.preventDefault();
        const currentSpellSchools = this.props.entity.spellSchools;
        currentSpellSchools.splice(currentSpellSchools.indexOf(spellSchool), 1);
        this.getRelevantSpellSchools();
        this.props.onChange(this.props.entity);
    };

    onSkillRemove = (event, skill: Skill) => {
        event.preventDefault();
        let skills = this.props.entity.skills;
        skills.splice(skills.indexOf(skill), 1);
        this.props.onChange(this.props.entity);
    };

    getRelevantSpellSchools = () => {
        const currentMagicKnowledge: CurrentMagicKnowledge = new CurrentMagicKnowledge();
        currentMagicKnowledge.currentSpellSchools = this.props.entity.spellSchools;
        magicService.getAvailableSpellSchools(currentMagicKnowledge, spellSchools => this.setState({
            availableSpellSchools: this.assembleAvailableSpellSchools(spellSchools),
            currentSpellSchools: this.props.entity.spellSchools
        }));
    };

    assembleAvailableSpellSchools = spellSchools => {
        const map = this.state.availableSpellSchools;
        map.clear();
        spellSchools.forEach(spellSchoolLevel => map.set(spellSchoolLevel.spellSchool, spellSchoolLevel));
        return map;
    };

    spellSchoolLevelText = (spellSchoolLevel: SpellSchoolLevel) => {
        return spellSchoolLevel.spellSchool.name + ' p. ' + spellSchoolLevel.level;
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
        const availableSpellSchools = [...this.state.availableSpellSchools.keys()];

        if (this.state.currentSpellSchools !== entity.spellSchools) {
            this.getRelevantSpellSchools();
        }

        return <div className={currentStyle.container} {...other}>
            <div className={currentStyle.firstColumn}>
                <SelectableList
                    customStyle={{container: currentStyle.skillFirstColumn, itemsList: currentStyle.skillsList}}
                    data={availableSkills} onGearAdd={this.onSkillAdd}>
                    {
                        firstColumnSkills.map(skill =>
                            <p className={currentStyle.skillElement}
                               onContextMenu={event => this.onSkillRemove(event, skill)}>{skill.name}</p>)
                    }
                </SelectableList>
                <ArmorCalculationsComponent className={currentStyle.armorCalculations} entity={entity}/>
            </div>
            <div className={currentStyle.secondColumn}>
                <SelectableList
                    customStyle={{
                        container: currentStyle.skillSecondColumn,
                        itemsList: currentStyle.skillsListSecondColumn
                    }}
                    data={availableSpellSchools} onGearAdd={this.onSpellSchoolAdd}>
                    {
                        entity.spellSchools.map(spellSchoolLevel =>
                            <p className={currentStyle.spellSchoolElement}
                               onContextMenu={event => this.onSpellSchoolRemove(event, spellSchoolLevel)}>
                                {this.spellSchoolLevelText(spellSchoolLevel)}
                            </p>)
                    }
                </SelectableList>
            </div>
        </div>;
    }
}

export default withStyles(skillSectionStyle)(SkillSection);