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
  lastLogin?: Date,
  isAuthenticated?: boolean,
}



export interface UserReducer {
  Auth: User,
  Chat: {
    messages: any[],
    loading: boolean,
    error: any,
  }
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  againNewPassword: string,
}

export interface UpdateInformation {
  email: string;
  phone: string;
  username: string;
  image: string;
}

