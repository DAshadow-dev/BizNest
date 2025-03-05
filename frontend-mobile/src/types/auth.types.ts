export interface Login {
  email: string;
  password: string;
}

export interface Register {
  username: string;
  password: string;
  email: string;
  phone: string;
  businessCategory: string;
  storeName: string;
  storeAddress: string;
  storePhone: string;
}
export interface VerifyEmail {
  token: string;
}
