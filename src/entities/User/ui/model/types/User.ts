export interface User {
  username: string;
  id: string;
}

export interface UserShema {
  authData?: User;
  _inited: boolean;
}
