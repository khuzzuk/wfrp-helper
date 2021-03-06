import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import Carousel, {ModalGateway} from "react-images";
import ScenarioService from "../client/ScenarioService";
import EntitySelect from "../form/field/EntitySelect";
import Scenario from "../model/realm/Scenario";
import Person from "../model/creature/Person";
import {State} from "../state/State";

class ScenarioView extends Component {
  state = {
    currentScenario: undefined,
    images: [],
    imgStyle: {maxWidth: '40vw', height: '30vh'},
    viewerIsOpen: false,
    currentImage: null,
  };

  fetchImages = scenario => {
    ScenarioService.fetchPicturesForScenario(scenario, data => {
      const images = data.map(num => `picture/${num}`);
      this.setState({images: images})
    });
  };

  render() {
    const entity                                         = State.data.entity;
    const {images, imgStyle, viewerIsOpen, currentImage} = this.state;

    return <div style={{paddingTop: 10}}>
      {entity ? <Grid container spacing={2}>
        <Grid item container xs={3}>
          {entity.persons.map(person => <Grid key={person.name} item xs={3}>
            <Button onClick={() => {
              State.showForm(Person.entityName, person);
              State.update({afterForm: () => State.updateScenario(entity)})
            }}>{person.name}</Button>
          </Grid>)}
        </Grid>
        <Grid item container xs={9} spacing={2}>
          {images.map((url, index) => <Grid item><Paper elevation={6}>
            <img src={url} alt={url} style={imgStyle}
                 onClick={() => this.setState({currentImage: index, viewerIsOpen: true})}/>
          </Paper></Grid>)}
        </Grid>
      </Grid> : <div>
        <EntitySelect name={Scenario.entityName}
                      onChange={scenario => {
                        State.updateScenario(scenario);
                        this.fetchImages(scenario);
                      }} value={null} editable/>
      </div>}
      <ModalGateway>
        <Modal onClose={() => this.setState({viewerIsOpen: false, currentImage: null})}
               open={viewerIsOpen}>
          <Carousel currentIndex={currentImage} views={images.map(src => ({source: src}))}/>
        </Modal>
      </ModalGateway>
    </div>;
  }
}

export default withTranslation()(ScenarioView);