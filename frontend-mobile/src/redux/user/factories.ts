import ApiConstants from 'src/adapter/ApiConstants'
import api from '@libs/api';
import type {ChangePassword, UpdateInformation} from '@type/user.types';

// TODO Change Type Paramester
const Factories = {
  changePassword: (data: ChangePassword) => {
    return api.post(
      ApiConstants.CHANGE_PASSWORD,
      {
        data,
      }
    ) 
  },

  updateInformation: (data: UpdateInformation) => {
    api.post(
        ApiConstants.UPDATE_INFORMATION,{
            data
        }
    )
  }
};
export default Factories;
