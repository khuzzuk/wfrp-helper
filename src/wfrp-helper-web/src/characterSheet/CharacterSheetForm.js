import React, {Component} from "react";
import FrontCharacterSheet from "../img/A.png";
import {TextField} from "@material-ui/core";
import {withStyles} from '@material-ui/styles';
import SimpleEntitySelect from "../crud/field/SimpleEntitySelect";
import SimpleEnumSelect from "../crud/field/SimpleEnumSelect";
import {Gender} from "../data/creature/Gender";
import SimpleEntityCombobox from "../crud/field/SimpleEntityCombobox";
import SuffixedInputField from "../crud/field/SuffixedInputField";
import SimpleList from "../crud/field/SimpleList";

const formStyles = {
    backgroundStyle: {
        background: `url(${FrontCharacterSheet})`,
        fontFamily: 'wfrp',
        fontSize: '24px',
        backgroundSize: 'cover',
        height: '1231px',
        width: '1800px',
        display: 'inline-flex'
    },

    input: {
        fontFamily: 'wfrp',
        fontSize: '24px',
    },

    nameField: {
        left: '35px',
        width: '200px'
    },
    raceField: {
        left: '45px',
        width: '130px',
        display: 'inline-flex'
    },
    genderField: {
        left: '55px',
        width: '80px',
        display: 'inline-flex',
        fontSize: '18px',
    },
    professionClassField: {
        left: '55px',
        width: '235px',
        display: 'inline-flex',
    },
    characterField: {
        left: '65px',
        width: '150px',
        display: 'inline-flex',
    },

    ageField: {
        left: '45px',
        width: '60px'
    },
    heightField: {
        left: '80px',
        width: '70px',
    },
    weightField: {
        left: '120px',
        width: '70px',
    },
    hairColorField: {
        left: '140px',
        width: '100px',
        display: 'inline-flex',
        fontSize: '16px',
    },
    eyeColorField: {
        left: '150px',
        width: '100px',
        display: 'inline-flex',
        fontSize: '16px',
    },
    physicalFeaturesField: {
        top: '-30px',
        width: '280px',
        maxHeight: '60px',
        minHeight: '60px',
        display: 'inline-flex',
        fontSize: '16px',
    },

    currentProfessionField: {
        left: '30px',
        width: '230px',
        display: 'inline-flex',
    },
    professionsField: {
        top: '10px',
        left: '45px',
        maxWidth: '300px',
        minWidth: '300px',
        maxHeight: '60px',
        minHeight: '60px',
        display: 'flex',
        fontSize: '16px',
        position: 'relative'
    },
};

class CharacterSheetForm extends Component {
    state = {
        person: undefined
    };

    createOnUpdatePerson = field => updates => {
        this.updatePerson({[field]: updates.target.value});
    };

    updateEntity = field => data => {
        this.updatePerson({[field]: data});
    };

    updateProfession = profession => {
        const professions = this.props.entity.professions;
        this.updatePerson({
            currentProfession: profession,
            professions: professions.includes(profession) ? professions : [...this.props.entity.professions, profession]
        })
    };

    removeProfession = profession => {
        const indexToRemove = this.props.entity.professions.indexOf(profession);
        if (indexToRemove >= 0) {
            this.props.entity.professions.splice(indexToRemove, 1);
            this.updatePerson({professions: this.props.entity.professions});
        }
    };

    updatePerson = updates => {
        this.props.entity.updateWith(updates);
        this.props.onChange(this.props.entity);
    };

    render() {
        const {classes, personService, entity} = this.props;
        return <div className={classes.backgroundStyle}>
            <div style={{width: '900px'}}>
                <div style={{top: '30px', position: 'relative', width: '100%'}}>
                    <TextField className={classes.nameField} inputProps={{className: classes.input}}
                               onChange={this.createOnUpdatePerson('name')}/>
                    <SimpleEntitySelect customStyle={classes.raceField}
                                        options={personService.races} onChange={this.updateEntity('race')}
                                        value={entity.race}/>
                    <SimpleEnumSelect customStyle={classes.genderField}
                                      options={Gender.allOf()} onChange={this.updateEntity('gender')}
                                      value={entity.gender}/>
                    <SimpleEntitySelect customStyle={classes.professionClassField}
                                        options={personService.professionClasses}
                                        onChange={this.updateEntity('professionClass')}
                                        value={entity.professionClass}/>
                    <SimpleEntitySelect customStyle={classes.characterField}
                                        options={personService.characters} onChange={this.updateEntity('character')}
                                        value={entity.character}/>
                </div>
                <div style={{
                    top: '65px',
                    position: 'relative',
                    display: 'inline-flex',
                    width: '100%',
                    maxHeight: '60px'
                }}>
                    <div style={{width: '700px'}}>
                        <SuffixedInputField className={classes.ageField} value={entity.age}
                                            onChange={this.updateEntity('age')} suffixClass={classes.input}
                                            suffix={'lat'}
                                            inputProps={{className: classes.input, style: {textAlign: 'right'}}}/>
                        <SuffixedInputField className={classes.heightField} value={entity.height}
                                            onChange={this.updateEntity('height')} suffixClass={classes.input}
                                            suffix={'cm'}
                                            inputProps={{className: classes.input, style: {textAlign: 'right'}}}/>
                        <SuffixedInputField className={classes.weightField} value={entity.weight}
                                            onChange={this.updateEntity('weight')} suffixClass={classes.input}
                                            suffix={'kg'}
                                            inputProps={{className: classes.input, style: {textAlign: 'right'}}}/>
                        <SimpleEntitySelect customStyle={classes.hairColorField} options={personService.hairColors}
                                            onChange={this.updateEntity('hairColor')}
                                            value={entity.hairColor}/>
                        <SimpleEntitySelect customStyle={classes.eyeColorField} options={personService.eyeColors}
                                            onChange={this.updateEntity('eyeColor')}
                                            value={entity.eyeColor}/>
                    </div>
                    <div>
                        <SimpleEntityCombobox customStyle={classes.physicalFeaturesField}
                                              options={personService.physicalFeatures}
                                              onChange={this.updateEntity('physicalFeatures')}
                                              value={entity.physicalFeatures}/>
                    </div>
                </div>
                <div style={{top: '65px', position: 'relative', display: 'inline-flex', width: '100%'}}>
                    <SimpleEntitySelect customStyle={classes.currentProfessionField} options={personService.professions}
                                        onChange={this.updateProfession}
                                        value={entity.currentProfession}/>
                    <SimpleList className={classes.professionsField} data={entity.professions}
                                onRemove={this.removeProfession}/>
                </div>
            </div>
            <div>

            </div>
        </div>;
    }
}

export default withStyles(formStyles)(CharacterSheetForm);