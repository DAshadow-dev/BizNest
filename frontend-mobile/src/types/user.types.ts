export interface User {
  id?: number,
  username?: string,
  password?: string,
  verified?: boolean,
  email?: string,
  phone?: string,
  image?: string,
  status?: string,
  createAt?: Date,
  lastLogin?: Date
}

export interface UserReducer {
  Auth: User;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  againNewPassword: string,
}

export interface UpdateInformation {
  Email: string;
  Phone: string;
  UserName: string;
  Image: string;
}

