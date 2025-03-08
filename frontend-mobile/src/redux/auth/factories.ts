import ApiConstants from 'src/adapter/ApiConstants';
import api from '@libs/api';
import { Login, Register, VerifyEmail } from '@type/auth.types';

const Factories = {
  login: (data: Login) => {
    return api.post(ApiConstants.LOGIN, { data });
  },

  register: (data: Register) => {
    return api.post(ApiConstants.REGISTER, { data });
  },

  verifyEmail: (data: VerifyEmail) => {
    return api.post(ApiConstants.VERIFY_EMAIL, { data });
  },
};

export default Factories;
