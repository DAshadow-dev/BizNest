export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  username: string;
  password: string;
  phone: string;
}

export interface VerifyEmail {
  token: string;
}
