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
import PersonalDeterminantsField from "./PersonalDeterminantsField";
import PersonDeterminants from "../data/creature/PersonDeterminants";
import GearSection from "./GearSection";

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
    row: {
        position: 'relative',
        width: '100%',
        display: 'inline-flex',
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
        paddingTop: '22px',
        marginLeft: '30px',
        width: '75px'
    },
    heightField: {
        paddingTop: '22px',
        marginLeft: '20px',
        width: '90px',
    },
    weightField: {
        paddingTop: '22px',
        marginLeft: '25px',
        width: '80px',
    },
    hairColorField: {
        paddingTop: '22px',
        marginLeft: '20px',
        width: '110px',
        display: 'inline-flex',
        fontSize: '16px',
    },
    eyeColorField: {
        paddingTop: '22px',
        marginLeft: '0px',
        width: '100px',
        display: 'inline-flex',
        fontSize: '16px',
    },
    physicalFeaturesField: {
        marginLeft: '60px',
        width: '280px',
        maxHeight: '60px',
        minHeight: '60px',
        display: 'inline-flex',
        fontSize: '16px',
    },

    currentProfessionField: {
        marginLeft: '30px',
        width: '230px',
        display: 'inline-flex',
    },
    professionsField: {
        marginLeft: '20px',
        maxWidth: '330px',
        minWidth: '330px',
        maxHeight: '30px',
        minHeight: '30px',
        display: 'flex',
        fontSize: '16px',
        position: 'relative'
    },
    nextProfessionsField: {
        marginLeft: '20px',
        maxWidth: '200px',
        minWidth: '200px',
        maxHeight: '30px',
        minHeight: '30px',
        display: 'flex',
        fontSize: '16px',
        position: 'relative'
    },

    personDeterminantsField: {
        paddingLeft: '230px',
        width: '100%',
        maxHeight: '150px',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },

    firstColumnContainer: {
        maxWidth: 400,
        minWidth: 400,
        height: '100%'
    },
    secondColumnContainer: {
        maxWidth: 200,
        minWidth: 200,
        height: '100%'
    },
    thirdColumnContainer: {
        maxWidth: 200,
        minWidth: 200,
        height: '100%'
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
        let professions = this.props.entity.professions;
        let determinants: PersonDeterminants = this.props.entity.determinants;
        determinants = determinants.updateProfessionExtensions(profession);
        if (!professions.find(prof => prof.name === profession.name)) {
            professions = [...this.props.entity.professions, profession];
        }

        this.updatePerson({
            currentProfession: profession,
            professions: professions,
            determinants: determinants
        });
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
                <div className={classes.row} style={{paddingTop: '30px'}}>
                    <TextField className={classes.nameField} inputProps={{className: classes.input}}
                               onChange={this.createOnUpdatePerson('name')} value={entity.name}/>
                    <SimpleEntitySelect className={classes.raceField}
                                        options={personService.races} onChange={this.updateEntity('race')}
                                        value={entity.race}/>
                    <SimpleEnumSelect customStyle={classes.genderField}
                                      options={Gender.allOf()} onChange={this.updateEntity('gender')}
                                      value={entity.gender}/>
                    <SimpleEntitySelect className={classes.professionClassField}
                                        options={personService.professionClasses}
                                        onChange={this.updateEntity('professionClass')}
                                        value={entity.professionClass}/>
                    <SimpleEntitySelect className={classes.characterField}
                                        options={personService.personalities}
                                        onChange={this.updateEntity('personality')}
                                        value={entity.personality}/>
                </div>
                <div className={classes.row} style={{paddingTop: '10px', maxHeight: '60px'}}>
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
                    <SimpleEntitySelect className={classes.hairColorField} options={personService.hairColors}
                                        onChange={this.updateEntity('hairColor')}
                                        value={entity.hairColor}/>
                    <SimpleEntitySelect className={classes.eyeColorField} options={personService.eyeColors}
                                        onChange={this.updateEntity('eyeColor')}
                                        value={entity.eyeColor}/>
                    <SimpleEntityCombobox customStyle={classes.physicalFeaturesField}
                                          options={personService.physicalFeatures}
                                          onChange={this.updateEntity('physicalFeatures')}
                                          value={entity.physicalFeatures}/>
                </div>
                <div className={classes.row} style={{paddingTop: '32px'}}>
                    <SimpleEntitySelect className={classes.currentProfessionField} options={personService.professions}
                                        onChange={this.updateProfession}
                                        value={entity.currentProfession}/>
                    <SimpleList className={classes.professionsField} data={entity.professions}
                                onRemove={this.removeProfession}/>
                    <SimpleList className={classes.nextProfessionsField}
                                data={entity.currentProfession ? entity.currentProfession.nextProfessions : []}/>
                </div>
                <div className={classes.row} style={{paddingTop: '45px'}}>
                    <PersonalDeterminantsField person={entity} className={classes.personDeterminantsField}
                                               onChange={dets => this.props.onChange(entity)}/>
                </div>
                <div className={classes.row} style={{height: 750, paddingTop: '20px'}}>
                    <GearSection className={classes.firstColumnContainer}
                                 personService={personService}
                                 entity={entity}
                                 onChange={this.props.onChange} />
                    <div className={classes.secondColumnContainer}>

                    </div>
                    <div className={classes.thirdColumnContainer}>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>;
    }
}

export default withStyles(formStyles)(CharacterSheetForm);