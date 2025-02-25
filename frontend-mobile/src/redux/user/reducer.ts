import type {UpdateInformation, User, UserReducer} from '@type/user.types';

import UserActions from './actions';
import { act } from 'react';

const initState: UserReducer = {
  Auth: {
    id: 0
  },
};

const Reducer = (
  state = initState,
  action: { type: string; payload: { Auth: User, newPassword: string, UpdateInformation: UpdateInformation}},
) => {
  switch (action.type) {
    case UserActions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        password: action.payload.newPassword
      };
    case UserActions.UPDATE_INFORMATION_SUCCESS:
      return {
        ...state,
        username: action.payload.UpdateInformation.UserName,
        phone: action.payload.UpdateInformation.Phone,
        email: action.payload.UpdateInformation.Email,
        image: action.payload.UpdateInformation.Image,
      };
    default:
      return state;
  }
};

export default Reducer;
