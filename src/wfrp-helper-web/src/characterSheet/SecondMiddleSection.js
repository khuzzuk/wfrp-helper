// @flow
import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import ItemSection from "./ItemSection";
import MoneySubsection from "./MoneySubsection";
import SpeedComponent from "./SpeedComponent";
import SelectableList from "../crud/field/SelectableList";
import IntegerField from "../crud/field/IntegerField";
import TextField from "@material-ui/core/TextField";
import HistorySection from "./HistorySection";
import ReligionSection from "./ReligionSection";
import EntityComponent from "../crud/EntityComponent";
import {Collections} from "../util/Collections";

const componentStyle = {
    container: {
        width: 900,
        minHeight: 700,
        maxHeight: 700,
        display: 'flex',
    },
    input: {
        fontFamily: 'wfrp',
        fontSize: '24px',
        textAlign: 'center',
    },
    firstColumn: {
        minHeight: 700,
        maxHeight: 700,
        minWidth: 300,
        maxWidth: 300,
    },
    secondColumn: {
        minHeight: 700,
        maxHeight: 700,
        minWidth: 370,
        maxWidth: 370,
    },
    thirdColumn: {
        minHeight: 630,
        maxHeight: 630,
        minWidth: 200,
        maxWidth: 200,
        paddingLeft: 20,
        paddingTop: 70,
    },

    psycheSection: {
        display: 'flex',
        width: 350,
        height: 160,
    },
    languageList: {
        paddingLeft: 15,
        paddingTop: 30,
        width: 100,
        height: 130,
        fontSize: 16,
    },
    elementLanguageList: {
        width: '100%',
        height: '100%',
    },
    languageElement: {
        width: 125,
        fontSize: 16,
    },
    healthElement: {
        minWidth: 125,
        maxWidth: 125,
        height: 100,
        paddingLeft: 10,
        paddingTop: 60,
    },
    sanityElement: {
        minWidth: 100,
        maxWidth: 100,
        height: 150,
        paddingLeft: 10,
        paddingTop: 80,
    },

    experienceActualLabel: {
        minWidth: 100,
        maxWidth: 100,
    },
    experienceActual: {
        minWidth: 150,
        maxWidth: 150,
    },
    experienceTotalLabel: {
        minWidth: 100,
        maxWidth: 100,
    },
    experienceTotal: {
        minWidth: 150,
        maxWidth: 150,
    },
};

class SecondMiddleSection extends EntityComponent {
    render() {
        const {
            customStyle, classes,
            onChange, personService,
            entity,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};

        return (
            <div {...other} className={currentStyle.container}>
                <div className={currentStyle.firstColumn}>
                    <ItemSection entity={entity} personService={personService} onChange={onChange}/>
                    <MoneySubsection entity={entity} personService={personService} onChange={onChange}/>
                </div>
                <div className={currentStyle.secondColumn}>
                    <SpeedComponent entity={entity}/>
                    <div className={currentStyle.psycheSection}>
                        <SelectableList customStyle={{
                            container: currentStyle.languageList,
                            itemsList: currentStyle.elementLanguageList
                        }}
                                        data={Collections.except(personService.languages, entity.languages)}
                                        onGearAdd={this.pushToEntity('languages')}>
                            {
                                entity.languages.map(language => <div className={currentStyle.languageElement}
                                                                      onContextMenu={this.removeOnContextMenu('languages', language)}>{language.name}</div>)
                            }
                        </SelectableList>
                        <TextField className={currentStyle.healthElement}
                                   inputProps={{className: classes.input}}
                                   value={entity.health}
                                   onChange={this.updateEntityWithEvent('health')}
                                   multiline/>
                        <IntegerField className={currentStyle.sanityElement}
                                      value={entity.sanityPoints}
                                      inputProps={{className: classes.input}}
                                      onChange={this.updateEntity('sanityPoints')}/>
                    </div>
                    <HistorySection entity={entity} personService={personService} onChange={onChange}/>
                    <ReligionSection entity={entity} personService={personService}/>
                </div>
                <div className={currentStyle.thirdColumn}>
                    <div className={currentStyle.experienceActualLabel}>aktualnie:</div>
                    <IntegerField className={currentStyle.experienceActual}
                                  inputProps={{className: classes.input}}
                                  value={entity.experience}
                                  onChange={this.updateEntity('experience')}/>
                    <div className={currentStyle.experienceTotalLabel}>całkowite:</div>
                    <IntegerField className={currentStyle.experienceTotal}
                                  inputProps={{className: classes.input}}
                                  value={entity.totalExperience}
                                  onChange={this.updateEntity('totalExperience')}/>
                </div>
            </div>
        );
    };
};

export default withStyles(componentStyle)(SecondMiddleSection);