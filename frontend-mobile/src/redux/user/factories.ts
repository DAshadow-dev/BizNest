import ApiConstants from 'src/adapter/ApiConstants'
import api from '@libs/api';
import type {ChangePassword, UpdateInformation} from '@type/user.types';

// TODO Change Type Paramester
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
  }
};
export default Factories;
