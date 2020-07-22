import RemoteService from "./RemoteService";
import Picture from "../img/Picture";

export default class PictureService extends RemoteService {
  uploadPicture(picture: object, onResponse: VoidFunction) {
    this.rawPostRequest(Picture.entityName, picture, onResponse);
  }

  updateMetadata(updates: object, onResponse: VoidFunction) {
    this.postRequestWithoutResponse(updates, Picture.entityName, onResponse)
  }
}