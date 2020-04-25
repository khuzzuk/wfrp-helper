import {
  Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, TextField
} from "@material-ui/core";
import {Cancel} from "@material-ui/icons";
import {DropzoneArea} from "material-ui-dropzone";
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {State} from "../state/State";
import Picture from "./Picture";

class PictureUploadForm extends Component {
  onResponse = response => {
    if (response.ok) {
      State.showTable(Picture.entityName);
      State.services.picture.loadData();
    } else {
      alert(response.status);
      console.log(response.error);
    }
  };

  upload = files => {
    const selectedFile = files[0];
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch(Picture.entityName, {
      method: 'post', body: formData,
    }).then(this.onResponse);
  };

  setName = event => {
    const value           = event.target.value;
    this.props.value.name = value;
    this.setState({name: value});
  };

  saveName = () => {
    const value    = this.props.value;
    const jsonBody = JSON.stringify({id: value.id, name: value.name});
    let url        = Picture.entityName;
    fetch(url, {
      method: 'post', headers: {'Content-Type': 'application/json'}, body: jsonBody
    }).then(this.onResponse)
    .catch(reason => {
      console.log(reason);
    });
  };

  render() {
    const {value, t} = this.props;
    return <div style={{margin: 10}}>
      {value ?

          <Card style={{width: '90vw'}}>
            <CardHeader title={value.name}/>
            <CardContent>
              <img src={Picture.entityName + '/' + value.id} alt={value.name} style={{maxWidth: '80vw', maxHeight: '50vh'}}/>
            </CardContent>
            <CardActions>
              {<TextField value={value ? value.name : ''} onChange={this.setName}
                          disabled={!value}/>}
              <Button onClick={this.saveName}>{t('save')}</Button>
            </CardActions>
          </Card> :

          <DropzoneArea acceptedFiles={['image/jpeg', 'image/jpg', 'image/png']}
                        onChange={this.upload}/>}

      <IconButton onClick={() => State.showTable(Picture.entityName)}>
        <Cancel/>
      </IconButton>
    </div>;
  }
}

export default withTranslation()(PictureUploadForm);