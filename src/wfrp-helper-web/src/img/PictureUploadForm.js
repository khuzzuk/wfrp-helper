import {Button, IconButton, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Cancel} from "@material-ui/icons";
import {DropzoneArea} from "material-ui-dropzone";
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import PictureService from "../client/PictureService";
import EntitySelect from "../form/field/EntitySelect";
import Place from "../model/world/Place";
import {State} from "../state/State";
import AuthoritiesService from "../user/AuthoritiesService";
import Picture from "./Picture";

const pictureService = new PictureService();

class PictureUploadForm extends Component {
  onResponse = () => {
    State.showTable(Picture.entityName);
    State.services.picture.loadData();
  };

  upload = files => {
    const selectedFile = files[0];
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    pictureService.uploadPicture(formData, this.onResponse);
  };

  setName = event => {
    const value           = event.target.value;
    this.props.value.name = value;
    this.setState({name: value});
  };

  setPlace = place => {
    this.props.value.place = place;
    this.setState({place: place});
  };

  save = () => {
    const value   = this.props.value;
    const updates = {id: value.id, name: value.name};
    if (value.place) {
      updates.placeId = value.place.id;
    }

    pictureService.updateMetadata(updates, this.onResponse);
  };

  render() {
    const {value, t}   = this.props;
    const hasAuthority = AuthoritiesService.hasAuthority(Picture.entityName);

    return <div style={{margin: 10}}>
      {value ?

          <Grid container spacing={2}>
            <Grid item container xs={12} alignItems={"center"}>
              <Grid item xs={4}>
                <TextField value={value ? value.name : ''} onChange={this.setName}
                           disabled={!value}/>
              </Grid>
              <Grid item xs={6}>
                <EntitySelect name={Place.entityName} onChange={this.setPlace} value={value.place}
                              editable/>
              </Grid>
              <Grid item xs={2}>{hasAuthority ?
                  <Button onClick={this.save}>{t('save')}</Button> :
                  <div/>}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <img src={Picture.entityName + '/' + value.id} alt={value.name}
                   style={{maxWidth: '80vw', maxHeight: '50vh'}}/>
            </Grid>
          </Grid> :

          <DropzoneArea acceptedFiles={['image/jpeg', 'image/jpg', 'image/png']}
                        onChange={this.upload}/>}

      <IconButton onClick={() => State.showTable(Picture.entityName)}>
        <Cancel/>
      </IconButton>
    </div>;
  }
}

export default withTranslation()(PictureUploadForm);