import RemoteService from "../client/RemoteService";
import {State} from "../state/State";

export default class AuthoritiesService extends RemoteService {
  refreshAuthorities() {
    this.requestForPath('authorities', authorities => {
      State.updateUser({authorities: authorities});
    })
  }

  static hasAuthority(entityName: string) {
    return State.data.user.authorities.find(role => role.toLowerCase()
                                                        .endsWith(entityName.toLowerCase()));
  }
}