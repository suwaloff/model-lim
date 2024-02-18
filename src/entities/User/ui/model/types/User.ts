export interface User {
  username: string;
  id: string;
  avatar?: string;
}

export interface UserShema {
  authData?: User;
  _inited: boolean;
}
