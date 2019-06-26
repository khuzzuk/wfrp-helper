// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import ItemSection from "./ItemSection";
import MoneySubsection from "./MoneySubsection";
import SpeedComponent from "./SpeedComponent";
import SelectableList from "../crud/field/SelectableList";
import IntegerField from "../crud/field/IntegerField";
import TextField from "@material-ui/core/TextField";
import HistorySection from "./HistorySection";
import ReligionSection from "./ReligionSection";

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
        minHeight: 700,
        maxHeight: 700,
        minWidth: 220,
        maxWidth: 220,
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
};

class SecondMiddleSection extends Component {
    onLanguageAdd = language => {
        this.props.entity.languages.push(language);
        this.props.onChange(this.props.entity);
    };

    onLanguageRemove = language => {
        const entity = this.props.entity;
        const languages = entity.languages;
        languages.splice(languages.indexOf(language), 1);
        this.props.onChange(entity);
    };

    getRelevantLanguages = () => {
        const currentLanguages = this.props.entity.languages;
        const languages = this.props.personService.languages;
        return languages.filter(language => !currentLanguages.find(cl => cl.name === language.name));
    };

    updateEntity = property => data => {
        this.props.entity[property] = data;
        this.props.onChange(this.props.entity);
    };
    updateEntityWithEvent = property => data => {
        this.props.entity[property] = data.target.value;
        this.props.onChange(this.props.entity);
    };

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
                                        data={this.getRelevantLanguages()}
                                        onGearAdd={this.onLanguageAdd}>
                            {
                                entity.languages.map(language => <div className={currentStyle.languageElement}
                                                                      onContextMenu={event => {
                                                                          event.preventDefault();
                                                                          this.onLanguageRemove(language);
                                                                      }}>{language.name}</div>)
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
                <div className={currentStyle.thirdColumn}></div>
            </div>
        );
    };
};

export default withStyles(componentStyle)(SecondMiddleSection);