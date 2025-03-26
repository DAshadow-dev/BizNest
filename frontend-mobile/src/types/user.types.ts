export interface User {
  _id?: number,
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
  storeId?: string,
}

export interface Customer {
  _id?: number,
  fullname?: string,
  email?: string,
  phone?: boolean,
  gender?: boolean,
  date_of_birth?: Date,
  createdAt?: Date,
}

export interface UserReducer {
  Auth: User,
}

export interface CustomerReducer {
  ListCustomer: Array<Customer>;
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

