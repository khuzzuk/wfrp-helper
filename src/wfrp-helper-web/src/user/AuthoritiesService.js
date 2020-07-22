import RemoteService from "../client/RemoteService";
import {State} from "../state/State";

export default class AuthoritiesService extends RemoteService {
  refreshAuthorities() {
    this.requestForPath('authorities', authorities => {
      State.updateUser({authorities: authorities});
    })
  }

  static hasAuthority(entityName: string) {
    const authorities = State.data.user.authorities;
    return authorities && authorities.find(role => role.toLowerCase()
                                                       .endsWith(entityName.toLowerCase()));
  }
}