import React from "react";
import FrontCharacterSheet from "../img/A.png";
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
import SkillSection from "./SkillSection";
import MagicSection from "./MagicSection";
import SecondMiddleSection from "./SecondMiddleSection";
import AnimalsSection from "./AnimalsSection";
import EntityComponent from "../crud/EntityComponent";
import SimpleTextField from "../crud/field/SimpleTextField";
import {store} from "../state";

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
        paddingLeft: 35,
        paddingTop: 5,
        width: '200px'
    },
    raceField: {
        paddingLeft: 10,
        width: 140,
        display: 'inline-flex'
    },
    genderField: {
        paddingLeft: 5,
        width: 90,
        display: 'inline-flex',
        fontSize: '18px',
    },
    professionClassField: {
        width: 240,
        display: 'inline-flex',
    },
    characterField: {
        width: 180,
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
        maxWidth: 450,
        minWidth: 450,
        height: '100%'
    },
};

class CharacterSheetForm extends EntityComponent {
    state = {
        person: undefined
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

    updatePerson = updates => {
        this.props.entity.updateWith(updates);
        this.props.onChange(this.props.entity);
    };

    render() {
        const {classes, entity, onChange} = this.props;
        const personService = store.personService;

        return <div className={classes.backgroundStyle}>
            <div style={{width: '900px'}}>
                <div className={classes.row} style={{paddingTop: '30px'}}>
                    <SimpleTextField className={classes.nameField} value={entity.name}
                                     onChange={this.updateEntity('name')}/>
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
                                onRemove={this.removeFromArray('professions')}/>
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
                                 onChange={onChange}/>
                    <SkillSection entity={entity}
                                  personService={personService}
                                  onChange={onChange}/>
                </div>
            </div>
            <div>
                <MagicSection entity={entity} personService={personService} onChange={onChange}/>
                <SecondMiddleSection entity={entity} personService={personService} onChange={onChange}/>
                <AnimalsSection entity={entity} personService={personService}/>
            </div>
        </div>;
    }
}

export default withStyles(formStyles)(CharacterSheetForm);