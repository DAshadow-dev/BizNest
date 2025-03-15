import ApiConstants from 'src/adapter/ApiConstants'
import api from '@libs/api';
import type {ChangePassword, UpdateInformation} from '@type/user.types';
import { Login, Register, VerifyEmail } from '@type/auth.types';

const Factories = {
  changePassword: (data: ChangePassword) => {
    return api.put(
      ApiConstants.CHANGE_PASSWORD,
      {
        data,
      }
    ) 
  },

  updateInformation: (data: UpdateInformation) => {
    return api.put(
        ApiConstants.UPDATE_INFORMATION,{
            data
        }
    )
  },

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
