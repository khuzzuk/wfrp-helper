export interface Authority {
  authority: string;
}

export default class User {
  username: string = '';
  password: string = '';
  authorities: Authority[] = [];
}