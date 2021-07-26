import {BaseEntity} from "../BaseEntity";

export class Authority extends BaseEntity {
  authority: string = '';
}

export default class User extends BaseEntity {
  username: string = '';
  password: string = '';
  oneTimePassword?: boolean = false;
  authorities: Authority[] = [];
}

export const ROLE_ADMIN = 'ROLE_ADMIN';