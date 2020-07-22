import RemoteService from "../client/RemoteService";
import Service from "../client/Service";
import {State} from "../state/State";
import Role from "./Role";
import User from "./User";

const userService = new Service(User.entityName);
const roleService = new Service(Role.entityName);

export default class AuthoritiesService extends RemoteService {
  refreshAuthorities() {
    this.requestForPath('authorities', authorities => {
      State.updateUser({authorities: authorities});
      AuthoritiesService.updateAdminAuthoritiesIfNeeded();
    });
  }

  static hasAuthority(entityName: string) {
    const authorities = State.data.currentUser.authorities;
    return authorities && authorities.find(role => role.authority.toLowerCase()
                                                       .endsWith(entityName.toLowerCase()));
  }

  updatePassword(newPassword: string) {
    this.postRequestWithoutResponse({...State.data.currentUser, ...{password: newPassword}},
                                    'password',
                                    () => State.updateUser({oneTimePassword: false}))
  }

  static updateAdminAuthoritiesIfNeeded() {
    if (AuthoritiesService.hasAuthority('admin')) {
      roleService.loadData();
      userService.loadData();
      State.services.user = userService;
    }
  }
}